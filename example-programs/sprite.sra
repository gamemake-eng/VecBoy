%main
	PSHL $6
	PSHL $06
	STR $30FF

	
	PSHL &guy
	PSHL $5
	PSHL &render-sprite
	CAL
	JML &main

@guy
	[length]
	$14
	[x1 y1 sx sy]
	$2 $1 $1 $2
	$1 $2 $2 $2
	$1 $1 $1 $1
	$3 $2 $2 $3
	$2 $3 $3 $3
