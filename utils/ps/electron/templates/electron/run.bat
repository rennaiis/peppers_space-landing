@echo off

timeout /t 10
taskkill /f /im explorer.exe

set DIR=%~dp0

:loop
"%DIR%win-unpacked\000000.exe" ^
  --server ^
  --data="%DIR%content" ^
  --application="%DIR%out" ^
  --app=index ^
  --query-params=""

if %ERRORLEVEL% EQU 100 goto :loop
