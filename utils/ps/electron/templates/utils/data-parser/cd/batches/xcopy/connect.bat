@echo off

echo [PUSHD] %1
pushd %1
IF /I "%ERRORLEVEL%" NEQ "0" (
  echo dir %1 is unavailable
  exit 1
  goto :eof
)
