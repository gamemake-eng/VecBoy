class Audio {
	constructor() {
		this.memory = new Int16Array(4);

		this.audioCtx = new AudioContext();

		this.c1 = new OscillatorNode(this.audioCtx);
		this.c1.type = "sine";
		this.c1.frequency.setValueAtTime(0, this.audioCtx.currentTime);
		this.c1.connect(this.audioCtx.destination);

		this.c2 = new OscillatorNode(this.audioCtx);
		this.c2.type = "square";
		this.c2.frequency.setValueAtTime(0, this.audioCtx.currentTime);
		this.c2.connect(this.audioCtx.destination);

		this.c3 = new OscillatorNode(this.audioCtx);
		this.c3.type = "triangle";
		this.c3.frequency.setValueAtTime(0, this.audioCtx.currentTime);
		this.c3.connect(this.audioCtx.destination);

		this.c4 = new OscillatorNode(this.audioCtx);
		this.c4.type = "square";
		this.c4.frequency.setValueAtTime(0, this.audioCtx.currentTime);
		this.c4.connect(this.audioCtx.destination);
	}

	get(a) {
		return this.memory[a];
	}

	set(a,v) {
		this.memory[a]=v;
	}

	start() {
		try {
			this.c1.start();
			this.c2.start();
			this.c3.start();
			this.c4.start();
		}catch {
			return;
		}
		
	}

	update() {
		this.c1.frequency.setValueAtTime(this.memory[0], this.audioCtx.currentTime);
		this.c2.frequency.setValueAtTime(this.memory[1], this.audioCtx.currentTime);
		this.c3.frequency.setValueAtTime(this.memory[2], this.audioCtx.currentTime);
		this.c4.frequency.setValueAtTime(this.memory[3], this.audioCtx.currentTime);
	}
}