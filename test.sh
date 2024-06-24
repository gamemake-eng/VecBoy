rm *.rat
lua compiler.lua example-programs/alphabet.sra --o alphabet.rat
lua compiler.lua example-programs/hello-world.sra example-programs/print-char.sra --o hello-world.rat
lua compiler.lua example-programs/interrupts.sra example-programs/print-char.sra example-programs/bits.sra --o interrupts.rat
lua compiler.lua example-programs/clear-screen.sra example-programs/alias-vecr.sra --o clear-scr.rat
lua compiler.lua example-programs/smile.sra example-programs/shapes.sra --o happy-face.rat
lua compiler.lua example-programs/moving.sra example-programs/shapes.sra --o rectangle.rat
lua compiler.lua example-programs/shapes.sra --o example-programs/shape-lib.rat
lua compiler.lua example-programs/moving.sra --l example-programs/shape-lib.rat --o rectangle-l.rat
