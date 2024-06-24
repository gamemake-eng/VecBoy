%type-letter
	[Get current console index from address]
	PSHA $4000
	SWP
	[Print letter to console]
	STR $3000
	PSHA $4000
	[Increment the pointer]
	INC
	[Store back in memory]
	STO $4000
	RET