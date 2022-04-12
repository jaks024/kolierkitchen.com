set /a Index=0

setlocal enabledelayedexpansion

for /r %%i in (*.webp) do ( 
    rename "%%i" "!Index!.webp"
    set /a Index+=1
)