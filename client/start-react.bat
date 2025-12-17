@echo off
echo Starting React on port 3001...
cd /d %~dp0
set PORT=3001
set BROWSER=none
call npm start

