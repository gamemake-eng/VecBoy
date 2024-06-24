[HELLO]

PSHL "H
PSHL &type-letter
CAL


PSHL "E
PSHL &type-letter
CAL


PSHL "L
PSHL &type-letter
CAL

PSHL "L
PSHL &type-letter
CAL


PSHL "O
PSHL &type-letter
CAL

PSHL "\w
PSHL &type-letter
CAL

[WORLD]

PSHL "W
PSHL &type-letter
CAL

PSHL "O
PSHL &type-letter
CAL

PSHL "R
PSHL &type-letter
CAL

PSHL "L
PSHL &type-letter
CAL

PSHL "D
PSHL &type-letter
CAL

HLT

%wait-5
	NIN
	NIN
	NIN
	NIN
	NIN
	RET

%wait
	PSHL &wait-5
	CAL
	PSHL &wait-5
	CAL
	PSHL &wait-5
	CAL
	PSHL &wait-5
	CAL
	RET