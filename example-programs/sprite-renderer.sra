%render-sprite
	[Store the position of the sprite in memory]
	STO &sprite-offset
	STO &scale-ef44

	[Set counter to the length of the sprite set in the first byte]
	PSHA &sprite-offset
	STO &counter

	%restart-ef354

	[Get the line]

	PSHA &counter
	DEC
	STO &counter

	[x1]

	PSHA &counter
	GTR &sprite-offset
	PSHA &scale-ef44
	MUL


	PSHA &counter
	DEC
	STO &counter

	[y1]

	PSHA &counter
	GTR &sprite-offset
	PSHA &scale-ef44
	MUL

	

	[sx]

	PSHA &counter
	GTR &sprite-offset
	PSHA &scale-ef44
	MUL

	PSHA &counter
	DEC
	STO &counter

	[sy]

	PSHA &counter
	GTR &sprite-offset
	PSHA &scale-ef44
	MUL

	PSHA &counter
	DEC
	STO &counter

	[Draw line on backbuffer]

	PSHL &line
	CAL

	PSHA &counter
	PSHL $0
	NEQ
	JPC &restart-ef354


	RET



%sprite-offset
%counter
%scale-ef44