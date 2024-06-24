//Memory Bus

class MemBus {
	constructor(){
		this.regions = []
	}
	map(d,s,e,remap=true){
		let r = {device:d,start:s,end:e,remap:remap};
		this.regions.unshift(r)

	}
	get(a){
		let d = this.regions.find(r => (a >= r.start) && (a <= r.end))
		if(!d){
			throw new Error(`Cant find 0x${a.toString(16)}`)
		}
		let ra = d.remap ? a-d.start : a
		
		return d.device.get(ra)
	}
	set(a,v){
		let d = this.regions.find(r => (a >= r.start) && (a <= r.end))
		if(isNaN(a)){
			console.log(d,a)
		}
		
		let ra = d.remap ? a-d.start : a
		if(!d){
			throw new Error(`Cant find 0x${a}`)
		}
		d.device.set(ra,v)
	}
}

class Stack {
	constructor(size){
		this.ram = new Uint16Array(size)
		this.SP = this.ram.length-1
		this.size = 0
	}

	push(v){
		if (this.SP < 0) {
			throw new Error("Stack overflow")
		}
		this.ram[this.SP] = v
		this.SP--
		this.size++
	}



	pop() {
		this.SP++
		if (this.SP > this.ram.length-1) {
			throw new Error("Stack underflow")
		}
		this.size--

		return this.ram[this.SP]

	}

	rot() {
		let a = this.pop()
		let b = this.pop()
		let c = this.pop()
		this.push(b)
		this.push(a)
		this.push(c)
		
	}

	swap() {
		let a = this.pop()
		let b = this.pop()
		this.push(a)
		this.push(b)
	}

}


class RAM {
	constructor(size) {
		this.memory = new Int16Array(size)
	}

	set(a,v) {
		this.memory[a] = v
	}

	get(a) {
		return this.memory[a]
	}

	load(list,start=0) {
		for (var i = 0; i < list.length; i++) {
			this.memory[i+start] = list[i]
		}
	}
}

class ROM {
	constructor(size) {
		this.memory = new Uint16Array(size)
	}

	set(a,v) {
		//this.memory[a] = v
	}

	get(a) {

		return this.memory[a]
	}

	load(list,start=0) {
		for (var i = 0; i < list.length; i++) {
			this.memory[i+start] = list[i]
		}
	}
}

class CONSOLE {
	constructor(size){
		this.memory = new Uint16Array(size)
	}
	set(a,v) {
		let char = v

		this.memory[a] = char
	}

	get(a) {
		return this.memory[a]
	}

	render(){
		let str = ""
		let r = 0;
		
		for (var i = 0; i < this.memory.length; i++) {
			
			str += String.fromCharCode(this.memory[i])
			
		}
		return str
	}

	load(list,start=0) {
		for (var i = 0; i < list.length; i++) {
			this.memory[i+start] = list[i]
		}
	}
}