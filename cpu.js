let op = {
	PUSH_LIT: 0x10,
	PUSH_ADDR: 0x11,
	POP:0x12,
	//Command can be at 0x13,
	SWH:0x14,
	STO:0x15,
	STR:0x16,
	SWP:0x17,
	ROT:0x18,
	DUP:0x19,
	OVR:0x1A,
	DUP2:0x1B,
	LIM: 0x1C,
	SIM: 0x1D,
	GTR: 0x1E,

	ADD: 0x20,
	SUB: 0x21,
	DIV: 0x22,
	MUL: 0x23,
	INC: 0x24,
	DEC: 0x25,
	AND: 0x26,
	OR: 0x27,
	XOR: 0x28,
	LFS: 0x29,
	RTS: 0x2a,
	NOT: 0x2B,

	CAL: 0x30,
	RET: 0x31,
	JMP: 0x32,
	JPC: 0x33,
	INT: 0x34,
	RFI: 0x35,
	JML:0x36,

	EQU: 0x40,
	NEQ:0x41,
	GTH:0x42,
	LTH:0x43,

	HLT: 0xFF
}
function getIndex(arr, val) {
	for(let i in arr){
		if(arr[i] == val){
			return i
		} 
	}
}

class CPU {
	constructor(mem, iv_addr){
		this.memory = mem
		this.iva = iv_addr
		//2 working stacks 256 byte each 
		this.wstack1 = new Stack(256)
		this.wstack2 = new Stack(256)
		this.wstack = this.wstack1
		//256 byte return stack
		this.rstack = new Stack(256)

		this.PC = 0
		this.S = 0

		this.halt = false;

		//Interrupt mask
		this.IM = 0xFFFF
		this.isInInt = false

		//Terminology
		//WS- working stack
		//RS- return stack
		//msb- most signifigant bit (0xFF--)
		//lsb- least signifigant bit (0x--FF)


	}

	switchStack(){
		this.S = this.S ? 0:1;
		if (this.S == 1) {
			this.wstack = this.wstack2
		}else {
			this.wstack = this.wstack1
		}
	}

	saveState(){
		this.rstack.push(this.PC)
	}

	restoreState(){
		this.PC = this.rstack.pop()
	}

	fetch(){
		let inst = this.memory.get(this.PC)
		this.PC+=1
		return inst
	}

	fetchByte() {
		var v1 = this.fetch()
		var v2 = this.fetch()
			
		var v = (v1 << 8) + v2
		return v
	}

	handleInt(v) {
		//get LSB
		let index = v % 0xf


		let isUnmasked = ((1 << index) & this.IM) != 0
		if(!isUnmasked){
			return
		}

		let pointer = this.iva + (index)
		console.log(pointer)
		let addr = this.memory.get(pointer)
		if (!this.isInInt) {
			this.saveState()


		}

		this.isInInt = true
		this.PC = addr





	}

	exe(instr){
		switch(instr){
		//Pushes literal value (msb, lsb) onto WS
		//PSH msb lsb
		case op.PUSH_LIT:
			//var v1 = this.fetch()
			//var v2 = this.fetch()
			
			//var v = (v1 << 8) + v2
			var v = this.fetchByte()
			this.wstack.push(v)
			break;
		//Pushes value of address onto WS
		//PSH msb lsb
		case op.PUSH_ADDR:	
			var addr = this.fetchByte()
			this.wstack.push(this.memory.get(addr))
			break;
		//Removes top value at WS
		//POP
		case op.POP:
			this.wstack.pop()
			break;
		//Switches current WS between WS 1 and 2 (WS 1 is the default on boot)
		//SWH
		case op.SWH:
			this.switchStack()
			break;
		//Stores top of WS at memory address a
		//STO msb lsb
		case op.STO:
			
			var a = this.fetchByte()
			var v = this.wstack.pop()
			this.memory.set(a,v)
			break;
		//Stores top of WS at memory address a plus the 2nd value of the WS
		//STR msb lsb
		case op.STR:
			
			var a = this.fetchByte()
			var v = this.wstack.pop()
			var o = this.wstack.pop()
			this.memory.set(a+o,v)
			break;
		//Swaps last 2 values on WS
		//SWP
		case op.SWP:
			this.wstack.swap()
			break;
		//Puts 3rd value on WS on top
		//ROT
		case op.ROT:
			this.wstack.rot()
			break;
		//Dupulcates top of WS
		//DUP
		case op.DUP:
			var a = this.wstack.pop()
			this.wstack.push(a)
			this.wstack.push(a)
			break;
		//Dupulcates second value of of WS
		//OVR
		case op.OVR:
			var a = this.wstack.pop()
			var b = this.wstack.pop()
			this.wstack.push(b)
			this.wstack.push(a)
			this.wstack.push(b)
			break;
		//Dupulcates first 2 values of of WS
		//DUP2
		case op.DUP2:
			var a = this.wstack.pop()
			var b = this.wstack.pop()
			this.wstack.push(b)
			this.wstack.push(a)
			this.wstack.push(b)
			this.wstack.push(a)
			break;
		//Saves top of WC to Interrupt mask
		//SIM
		case op.SIM:
			var a = this.wstack.pop()
			
			this.IM = a
			break;
		//Loads interrupt mask to top of WS
		//LIM
		case op.LIM:
			
			this.wstack.push(this.IM)
			
			break;
		//Stores memory address plus the current top of the WS at top of WS
		//GTR msb lsb
		case op.GTR:
			var a = this.fetchByte()
			
			var o = this.wstack.pop()
			this.wstack.push(this.memory.get(a+o))
			
			break

		//Pops and Adds the last 2 numbers on the WS and then pushes the result onto WS
		//ADD
		case op.ADD:
			var a = this.wstack.pop()
			var b = this.wstack.pop()
			this.wstack.push(a+b)
			break;
		//Pops and subtracts the last 2 numbers on the WS and then pushes the result onto WS
		//SUB
		case op.SUB:
			var a = this.wstack.pop()
			var b = this.wstack.pop()

			this.wstack.push(a-b)
			break;
		//Pops and multiplies the last 2 numbers on the WS and then pushes the result onto WS
		//MUL
		case op.MUL:
			var a = this.wstack.pop()
			var b = this.wstack.pop()
			this.wstack.push(a*b)
			break;
		//Pops and applies bitwise and to the last 2 numbers on the WS and then pushes the result onto WS
		//AND
		case op.AND:
			var a = this.wstack.pop()
			var b = this.wstack.pop()
			this.wstack.push(a&b)
			break;
		//Pops and applies bitwise or to the last 2 numbers on the WS and then pushes the result onto WS
		//OR
		case op.OR:
			var a = this.wstack.pop()
			var b = this.wstack.pop()
			this.wstack.push(a|b)
			break;
		//Pops and applies bitwise XOR to the last 2 numbers on the WS and then pushes the result onto WS
		//XOR
		case op.XOR:
			var a = this.wstack.pop()
			var b = this.wstack.pop()
			this.wstack.push(a^b)
			break;
		//Left Shifts the top of WS by literal v
		//LFS msb lsb
		case op.LFS:
			var a = this.wstack.pop()
			var v = this.fetchByte()
			this.wstack.push(a<<v)
			break;
		//Right Shifts the top of WS by literal v
		//RTS msb lsb
		case op.RTS:
			var a = this.wstack.pop()
			var v = this.fetchByte()
			this.wstack.push(a>>v)
			break;
		//Applies not to top of stack
		//NOT
		case op.NOT:
			var a = this.wstack.pop()
			
			this.wstack.push(~a)
			break;
		//Pops and divides the last 2 numbers on the WS and then pushes the result onto WS
		//DIV
		case op.DIV:
			var a = this.wstack.pop()
			var b = this.wstack.pop()

			this.wstack.push(a/b)
			break;
		//Increases the value on top of the WS by 1
		//INC
		case op.INC:
			var a = this.wstack.pop()
			this.wstack.push(a+1)
			break;
		//Decreases the value on top of the WS by 1
		//DEC
		case op.DEC:
			var a = this.wstack.pop()
			this.wstack.push(a-1)
			break;
		//Saves the state to the RS and sets PC to the address at the top of the WS
		//CAL
		case op.CAL:
			this.saveState()
			this.PC = this.wstack.pop()
			break;
		//Restores the state from the RS
		//RET
		case op.RET:
			this.restoreState()
			break;
		//Sets PC to the top of WS
		//JMP
		case op.JMP:
			var a = this.wstack.pop()
			this.PC = a
			break;
		//Sets PC to literal value
		//JML msb lsb
		case op.JML:
			var a = this.fetchByte()
			this.PC = a
			break;
		//Jumps to a if top of WS is equal to 1
		//JPC msb lsb
		case op.JPC:
			
			var c = this.wstack.pop()
			var a = this.fetchByte()
			//console.log(a)
			if (c===1) {
				this.PC = a
			}
			
			break;
		//Trigger a interrupt
		//INT a
		case op.INT:
			var a = this.fetchByte()
			this.handleInt(a)
			break;
		//Returns from interrupt
		//RFI
		case op.RFI:
			this.isInInt = false
			this.restoreState()
			break;

		//Pushes 1 if the 1st and 2nd values on the WS are equal. else, it pushes 0
		//EQU
		case op.EQU:
			var a = this.wstack.pop()
			var b = this.wstack.pop()
			if (a===b) {
				this.wstack.push(1)
			}else{
				this.wstack.push(0)
			}
			break;
		//Pushes 1 if the 1st and 2nd values on the WS are not equal. else, it pushes 0
		//NEQ
		case op.NEQ:
			var a = this.wstack.pop()
			var b = this.wstack.pop()
			if (a!==b) {
				this.wstack.push(1)
			}else{
				this.wstack.push(0)
			}
			break;
		//Pushes 1 if the 1st value of WS is greater than the second value on WS. else, it pushes 0
		//GTH
		case op.GTH:
			var a = this.wstack.pop()
			var b = this.wstack.pop()
			if (a>b) {
				this.wstack.push(1)
			}else{
				this.wstack.push(0)
			}
			break;
		//Pushes 1 if the 1st value of WS is less than the second value on WS. else, it pushes 0
		//LTH
		case op.LTH:
			var a = this.wstack.pop()
			var b = this.wstack.pop()
			if (a<b) {
				this.wstack.push(1)
			}else{
				this.wstack.push(0)
			}
			break;
		//Stops execution
		//HLT
		case op.HLT:
			this.halt = true
			break;
		default:
			break;
		}
	}

	step() {
		let i = this.fetch()
		let o = ""
		let o2 = ""
		for (var d = this.wstack.ram.length-1; d >= this.wstack.SP+1; d--) {
			
			o+=`0x${this.wstack.ram[d].toString(16)} `
		}
		for (var d = this.rstack.ram.length-1; d >= this.rstack.SP+1; d--) {
			
			o2+=`0x${this.rstack.ram[d].toString(16)} `
		}
		//this.debug_feed = console.log("stack:",o,"rstack",o2, "SP:", this.wstack.SP, "instr:", getIndex(op,i), "PC", this.PC)
		this.exe(i)
	}

	run() {
		while(!this.halt){
			for (var i = 5; i >= 0; i--) {
				this.step()
			}
			
		}
	}
	
}