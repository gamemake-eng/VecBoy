[Doing Random stuffs lol]
PSHL $BEEF

[Setting interrupts]
PSHL &test
STO $3103
PSHL &test-2
STO $3102

[Calling interrupt 4]
INT $03

PSHL "\w
PSHL &type-letter
CAL
[turn off interrupt 4]
LIM
PSHL &off-3
CAL
SIM
[test interrupt 4]
INT $03

[Calling interrupt 3]
INT $02

[turn off interrupt 3]
LIM
PSHL &off-2
CAL
SIM

[test interrupt 3]
INT $02

[Should do this]
PSHL $FEED



HLT


%test
	PSHL "H
	PSHL &type-letter
	CAL
	PSHL "e
	PSHL &type-letter
	CAL
	PSHL "l
	PSHL &type-letter
	CAL
	PSHL "l
	PSHL &type-letter
	CAL
	PSHL "o
	PSHL &type-letter
	CAL
	RFI

%test-2
	PSHL "W
	PSHL &type-letter
	CAL
	PSHL "o
	PSHL &type-letter
	CAL
	PSHL "r
	PSHL &type-letter
	CAL
	PSHL "l
	PSHL &type-letter
	CAL
	PSHL "d
	PSHL &type-letter
	CAL
	RFI