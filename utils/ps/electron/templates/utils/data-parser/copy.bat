@echo off

set dir=%~dp0

set COPY_FROM=%dir%server\static\temp
set COPY_TO=win-unpacked\resources\app

REM call :deploy 192.168.0.0

goto :eof

:deploy
set IP=%1
pushd \\%IP%\Content\app\%COPY_TO%
xcopy %COPY_FROM% /E /I /Y
popd