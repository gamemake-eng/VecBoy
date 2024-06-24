%set-cur
	[set cursor y]
	PSHL $1
	SWP
	STR $30FF

	[set cursor x]
	PSHL $0
	SWP
	STR $30FF
	RET

%set-scale
	[set scale y]
	PSHL $3
	SWP
	STR $30FF

	[set scale x]
	PSHL $2
	SWP
	STR $30FF
	RET

%line
	PSHL &set-scale
	CAL
	PSHL &set-cur
	CAL

	[draws line]
	PSHL $7
	PSHL $20
	STR $30FF

	RET

%scale
	PSHL $2f
	MUL
	RET
