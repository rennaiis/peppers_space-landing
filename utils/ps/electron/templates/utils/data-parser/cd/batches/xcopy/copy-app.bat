@echo off

set dst=%1
set src=%2
set dstPath=%3

set dir=%~dp0
call "%dir%connect.bat" %dst%

IF "%dstPath%" == "" (
  set dstPath=.
)
echo [COPY-APP START] %src% %dstPath%

REM xcopy %2 "%dstPath%" /D /E /Y /I /EXCLUDE:"%dir:"=%exclude.txt"
xcopy %src% "%dstPath%" /D /E /Y /I

echo [COPY-APP END]
popd
