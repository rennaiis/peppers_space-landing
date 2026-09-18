@echo off

echo [ZIP START]
set SRC=%1
set DST=%2

echo src: %SRC%
echo dst: %DST%

del /Q %DST%


call :7zip
@REM for /f "tokens=4-5 delims=. " %%i in ('ver') do set VERSION=%%i.%%j
@REM
@REM if "%version%" == "10.0" (
@REM   call powershell.exe -nologo -noprofile -command "& { Try {Add-Type -A 'System.IO.Compression.FileSystem'; [IO.Compression.ZipFile]::CreateFromDirectory('%SRC%', '%DST%');} Catch [system.exception] { exit 1 } }"
@REM   @REM call powershell.exe -nologo -noprofile -command "Compress-Archive -Path %SRC% -DestinationPath %DST%"
@REM   IF /I "%ERRORLEVEL%" NEQ "0" (
@REM     call :7zip
@REM   )
@REM ) else (
@REM   call :7zip
@REM )

echo [ZIP END]
goto :eof


:7zip
IF EXIST "%SYSTEMDRIVE%\Program Files\7-Zip\7z.exe" (
  call "%SYSTEMDRIVE%\Program Files\7-Zip\7z.exe" a %DST% %SRC%
) else (
  echo no zip
  exit 1
)
