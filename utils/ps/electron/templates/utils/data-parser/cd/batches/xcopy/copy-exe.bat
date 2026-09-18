@echo off

set dir=%~dp0
call %dir%connect.bat %1

IF NOT EXIST "win-unpacked" (
  echo [COPY-BUILD START] %2
  xcopy %2\win-unpacked win-unpacked /D /E /Y /I
  echo [COPY-BUILD END]
)
REM IF NOT EXIST "run.bat" (
REM  @start /B powershell -Command "(Get-Content %2\run.bat) -replace '--app=index', '--app=%3' | Out-File -encoding utf8 run.bat"
REM )
REM IF NOT EXIST "out" (
REM   mkdir out
REM )
REM IF NOT EXIST "data" (
REM   mkdir data
REM )

popd
