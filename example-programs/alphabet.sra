%main
	PSHL $0000
	PSHL &type-uppercase
	CAL
	PSHL &type-lowercase
	CAL
	HLT

%type-uppercase
	PSHL "A
	STO $4000
	%loop
		PSHL &type-letter
		CAL
		PSHA $4000
		PSHL "Z
		INC
		NEQ
		JPC &loop
		RET

%type-lowercase
	PSHL "a
	STO $4000
	%loop2
		PSHL &type-letter
		CAL
		PSHA $4000
		PSHL "z
		INC
		NEQ
		JPC &loop2
		RET


%type-letter
	DUP
	PSHA $4000
	STR $3000
	PSHA $4000
	INC
	STO $4000
	INC
	RET