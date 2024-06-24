async function load_from_file(file) {
	let t = await fetch(file)
  	let tl = await t.arrayBuffer()
  	let tct = new Uint8Array(tl)
  	let l = []
  	for (var i = 0; i < tct.length; i++) {
  		l.push( tct[i] )
  	}
  	return l;
}


let ram = new RAM(0xffff)

//4KB of memory for the program
let PRG_SIZE = 0xFA0

let offset = 0x3000
let INT_SIZE = 0xf
let CON_SIZE = 0xff
let VEC_SIZE = 0x8
let IO_SIZE = 0x9
let AUDIO_SIZE = 0x4

let prg = new RAM(PRG_SIZE)
let con = new CONSOLE(CON_SIZE)
let vector = new RAM(VEC_SIZE)
let int_vec = new RAM(INT_SIZE)
let io = new RAM(IO_SIZE)
let sound_chip = new Audio();

let mem = new MemBus()

mem.map(ram,0,0xffff)

mem.map(prg,0,PRG_SIZE)
mem.map(con,offset,offset+CON_SIZE)
mem.map(vector,offset+CON_SIZE,offset+CON_SIZE+VEC_SIZE)
mem.map(int_vec,offset+CON_SIZE+VEC_SIZE,offset+CON_SIZE+VEC_SIZE+INT_SIZE)
mem.map(io,offset+CON_SIZE+VEC_SIZE+INT_SIZE,offset+CON_SIZE+VEC_SIZE+INT_SIZE+IO_SIZE)
mem.map(sound_chip,offset+CON_SIZE+VEC_SIZE+INT_SIZE+IO_SIZE, offset+CON_SIZE+VEC_SIZE+INT_SIZE+IO_SIZE+AUDIO_SIZE)


let mma = {
	CON: offset,
	VEC: offset+CON_SIZE,
	INT: offset+CON_SIZE+VEC_SIZE,
	IO: offset+CON_SIZE+VEC_SIZE+INT_SIZE,
	AUDIO: offset+CON_SIZE+VEC_SIZE+INT_SIZE+IO_SIZE
}

let cpu = new CPU(mem, offset+CON_SIZE+VEC_SIZE)


let fps = 60
let time_per_frame = 1000/fps
let cycles_per_frame = 500

let r = new GraphicsChip(vector)
document.body.appendChild(r.canvas)
//document.body.appendChild(r.backbuffer)


let input_buffer = [0,0,0,0,0,0,0,0,0]

let button_map = {
	"ArrowUp": 0,
	"ArrowDown": 1,
	"ArrowLeft": 2,
	"ArrowRight": 3,
	"z": 4,
	"x": 5
}
r.canvas.addEventListener("mousemove", (e)=>{
	let rect = e.target.getBoundingClientRect();
	let x = e.clientX - rect.left
	let y = e.clientY - rect.top
	if (x < 0) {
		x = 0
	}
	if(y < 0){
		y = 0
	}
	input_buffer[6] = x; 
	input_buffer[7] = y;  
			      
})

r.canvas.addEventListener("click", (e)=>{
	sound_chip.start()
})

r.canvas.addEventListener("mousedown", (e)=>{
	input_buffer[8] = 1
})

r.canvas.addEventListener("mouseup", (e)=>{
	input_buffer[8] = 0
})
document.body.addEventListener("keydown", (e)=>{
	if (button_map[e.key] !== undefined) {
		//console.log(button_map[e.key])
		input_buffer[button_map[e.key]] = 1
	} 
	
})
document.body.addEventListener("keyup", (e)=>{
	if (button_map[e.key] !== undefined) {
		input_buffer[button_map[e.key]] = 0
	}
	
})

let last = Date.now()

function update() {
	let now = Date.now()
	let diff = now - last
	
	if(diff > time_per_frame){
		last = now
		io.load(input_buffer)
		
		for (var i = cycles_per_frame; i >= 0; i--) {
			
			if(!cpu.halt){
				cpu.step()	
			}
			r.update()
			sound_chip.update()
		}
		
	}
	window.requestAnimationFrame(update)
}


let cart = "./rectangle.rat"
load_from_file(cart).then(d2=>{
	prg.load(d2);
	
	update()
})


