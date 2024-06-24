%main

	[set cursor x]
	PSHL $0
	PSHL $0
	STR $30FF

	[set cursor y]
	PSHL $1
	PSHL $0
	STR $30FF
	
	[set scale x]
	PSHL $2
	PSHL $30
	STR $30FF
	[set scale y]
	PSHL $3
	PSHL $20
	STR $30FF

	PSHL $7
	PSHL $20
	STR $30FF


	[set cursor x]
	PSHL $0
	PSHA &scx
	STR $30FF

	[set cursor y]
	PSHL $1
	PSHL $0
	STR $30FF



	[set scale x]
	PSHL $2
	PSHL $30
	STR $30FF
	[set scale y]
	PSHL $3
	PSHA &scy
	STR $30FF

	PSHL $7
	PSHL $20
	STR $30FF

	PSHA &scy
	PSHL $1f4

	NEQ
	JPC &inc-y

	PSHA &scy
	PSHL $1f4

	EQU
	JPC &dec-y
	JML &continue
	%inc-y
		PSHA &scy
		INC
		STO &scy
		JML &continue

	%dec-y
		PSHA &scy
		DEC
		STO &scy

		PSHA &scx
		INC
		INC
		INC
		STO &scx

		JML &continue

	%continue
		[clear screen]
		PSHL $6
		PSHL $06
		STR $30FF



	JML &main

%scy
%scx