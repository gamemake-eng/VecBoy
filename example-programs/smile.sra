%main
	PSHL $5

	PSHL &scale
	CAL

	PSHL $1

	PSHL &scale
	CAL

	PSHL $5

	PSHL &scale
	CAL

	PSHL $6

	PSHL &scale
	CAL
	

	PSHL &line
	CAL

	PSHL $A
	PSHL &scale
	CAL
	PSHL $1
	PSHL &scale
	CAL
	PSHL $A
	PSHL &scale
	CAL
	PSHL $6
	PSHL &scale
	CAL
	

	PSHL &line
	CAL

	PSHL $4
	PSHL &scale
	CAL
	PSHL $8
	PSHL &scale
	CAL
	PSHL $B
	PSHL &scale
	CAL
	PSHL $8
	PSHL &scale
	CAL
	

	PSHL &line
	CAL

	PSHL $4
	PSHL &scale
	CAL
	PSHL $8
	PSHL &scale
	CAL
	PSHL $5
	PSHL &scale
	CAL
	PSHL $A
	PSHL &scale
	CAL

	PSHL &line
	CAL


	PSHL $B
	PSHL &scale
	CAL
	PSHL $8
	PSHL &scale
	CAL
	PSHL $A
	PSHL &scale
	CAL
	PSHL $A
	PSHL &scale
	CAL

	PSHL &line
	CAL

	PSHL $5
	PSHL &scale
	CAL
	PSHL $a
	PSHL &scale
	CAL
	PSHL $A
	PSHL &scale
	CAL
	PSHL $A
	PSHL &scale
	CAL

	PSHL &line
	CAL



	PSHL $6
	PSHL $06
	STR $30FF


	JML &main