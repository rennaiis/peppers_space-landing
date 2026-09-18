@echo off

echo [UNZIP START]
set ZIP=%1
set DST=%2

echo src: %ZIP%
echo dst: %DST%

rmdir /Q /S %DST%

for /f "tokens=4-5 delims=. " %%i in ('ver') do set VERSION=%%i.%%j

if "%version%" == "10.0" (
  call powershell.exe -nologo -noprofile -command "& { Try {Add-Type -A 'System.IO.Compression.FileSystem'; [IO.Compression.ZipFile]::ExtractToDirectory('%ZIP%', '%DST%');} Catch [system.exception] { exit 1 } }"
  IF /I "%ERRORLEVEL%" NEQ "0" (
    call :7zip
  )
) else (
  call :7zip
)

echo [UNZIP END]
goto :eof


:7zip
IF EXIST "%SYSTEMDRIVE%\Program Files\7-Zip\7z.exe" (
  call "%SYSTEMDRIVE%\Program Files\7-Zip\7z.exe" x %ZIP% -y -o%DST%
) else (
  echo no zip
  exit 1
)
