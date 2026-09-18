@echo off

set DIR=%~dp0

set PORT=8000
set HOST=http://localhost:1337

node "%DIR%server" --host=%HOST% --port=%PORT%
