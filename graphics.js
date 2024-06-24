class GraphicsChip {
	constructor(vmem) {
		//x1, y1, sx, sy, fx, fy, c, d
		this.vmem = vmem

		this.canvas = document.createElement("canvas")
		this.canvas.width = 600
		this.canvas.height = 600

		this.fctx = this.canvas.getContext("2d")


		this.backbuffer = document.createElement("canvas")

		this.backbuffer.width = this.canvas.width
		this.backbuffer.height = this.canvas.height

		this.ctx = this.backbuffer.getContext("2d")

		this.ctx.fillStyle = "#000000"
		this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height)

		this.fctx.fillStyle = "#000000"
		this.fctx.fillRect(0,0,this.canvas.width, this.canvas.height)
		

		
		this.ctx.imageSmoothingEnabled= false
		this.fctx.imageSmoothingEnabled= false

		this.ctx.lineCap = "round";
		this.ctx.lineWidth =4 


	}

	update() {

		


		
		let fx = this.vmem.get(4)
		let fy = this.vmem.get(5)

		let x = this.vmem.get(0)
		let y = this.vmem.get(1)
		let sx = (fx == 1) ? -this.vmem.get(2) : this.vmem.get(2)
		let sy = (fy == 1) ? -this.vmem.get(3) : this.vmem.get(3)

		

		let c = this.vmem.get(6)
		this.ctx.strokeStyle = "#FFFFFF"
		//console.log(x,y,sx,sy,fx,fy)

		let d = this.vmem.get(7)
		//this.ctx.translate(0,0)

		

		if (c !== 0) {
			this.flip()
			this.ctx.fillStyle = "#000000"
			this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height)
			this.vmem.memory[6] = 0
			
		}

		//this.ctx.translate(this.canvas.width*0.5,this.canvas.height*0.5)
		
		if (d !== 0) {
			
			this.ctx.beginPath();
			this.ctx.moveTo(x, y);
			this.ctx.lineTo(sx, sy);
			this.ctx.stroke()
		    
			this.vmem.memory[7] = 0
		}

	}

	flip() {
		this.fctx.drawImage(this.backbuffer,0,0)
	}
}