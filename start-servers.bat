@echo off
rem Start both servers for the portfolio project.
rem This script opens two new terminal windows: one for the websocket server and one for the Next.js frontend dev server.

rem --- Websocket server ---
start "websocket-server" cmd /k "cd /d "%~dp0websocket-server" && echo Starting websocket-server && npm start"

rem --- Frontend (3d-portfolio) ---
start "3d-portfolio" cmd /k "cd /d "%~dp03d-portfolio" && echo Starting frontend (Next dev) && npm run dev"

exit /b 0
