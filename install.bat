@echo off
echo ==============================
echo Installing Frontend dependencies...
echo ==============================
cd frontend\SE-THESIS || (echo Frontend folder not found & pause & exit)
call npm install
echo Frontend dependencies installed.
cd ..\..

echo ==============================
echo Installing Backend dependencies...
echo ==============================
cd server || (echo Backend folder not found & pause & exit)
call npm install
echo Backend dependencies installed.
cd ..

echo ==============================
echo Installing Python dependencies...
echo ==============================
cd backend || (echo Backend folder not found & pause & exit)
call venv\Scripts\activate.bat
call pip install -r requirements.txt
echo Python dependencies installed.
cd ..
echo All done! You can now run the run.bat Press any key to exit. 
pause
