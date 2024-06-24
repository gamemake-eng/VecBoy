%main
	PSHL $6
	PSHL $06
	STR $30FF
	

	[Check if button is pressed]

	[If up == 1]
	PSHA $3116
	PSHL $1
	EQU
	JPC &up
	
	[Else If down == 1]
	PSHA $3117
	PSHL $1
	EQU
	JPC &down

	[Else If left == 1]
	PSHA $3118
	PSHL $1
	EQU
	JPC &left

	[Else If right == 1]
	PSHA $3119
	PSHL $1
	EQU
	JPC &right


	[Else]
	JML &store
	


	%up
		PSHA &rect-y
		DEC

		STO &rect-y

		JML &store

	%down
		PSHA &rect-y
		INC

		STO &rect-y

		JML &store

	%left
		PSHA &rect-x
		DEC

		PSHL &center
		CAL

		STO &rect-x

		JML &store

	%right
		

		PSHA &rect-x
		INC

		PSHL &center
		CAL

		STO &rect-x

		JML &store
	
	%store
	

	PSHA $15
	STO &rect-s


	PSHL &draw-rect
	CAL
	
	


	JML &main

%center
	RET

%draw-rect
	PSHL $0

	PSHL &scale-2
	CAL

	PSHL &offset-x
	CAL

	PSHL $0

	PSHL &scale-2
	CAL

	PSHL &offset-y
	CAL

	PSHL $0

	PSHL &scale-2
	CAL

	PSHL &offset-x
	CAL

	PSHL $1

	PSHL &scale-2
	CAL

	PSHL &offset-y
	CAL

	PSHL &line
	CAL



	PSHL $0

	PSHL &scale-2
	CAL

	PSHL &offset-x
	CAL

	PSHL $1

	PSHL &scale-2
	CAL

	PSHL &offset-y
	CAL

	PSHL $1

	PSHL &scale-2
	CAL

	PSHL &offset-x
	CAL

	PSHL $1

	PSHL &scale-2
	CAL

	PSHL &offset-y
	CAL

	PSHL &line
	CAL



	PSHL $1

	PSHL &scale-2
	CAL

	PSHL &offset-x
	CAL

	PSHL $1

	PSHL &scale-2
	CAL

	PSHL &offset-y
	CAL

	PSHL $1

	PSHL &scale-2
	CAL

	PSHL &offset-x
	CAL

	PSHL $0

	PSHL &scale-2
	CAL

	PSHL &offset-y
	CAL

	PSHL &line
	CAL



	PSHL $1

	PSHL &scale-2
	CAL

	PSHL &offset-x
	CAL

	PSHL $0

	PSHL &scale-2
	CAL

	PSHL &offset-y
	CAL

	PSHL $0

	PSHL &scale-2
	CAL

	PSHL &offset-x
	CAL

	PSHL $0

	PSHL &scale-2
	CAL

	PSHL &offset-y
	CAL

	PSHL &line
	CAL

	RET

%scale-2
	PSHA &rect-s
	MUL
	RET

%offset-x
	PSHA &rect-x
	ADD
	RET
%offset-y
	PSHA &rect-y
	ADD
	RET

%rect-x
%rect-y
%rect-s

[Pauses execution for 1 frame (500 cycles)]
%wait-frame
	PSHL $1f4

	%loop-cycle
	NOP

	DEC

	DUP
	PSHL $0

	NEQ

	JPC &loop-cycle

	RET