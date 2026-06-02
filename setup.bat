@echo off
echo ========================================
echo   TheMart - Setup Script
echo ========================================

echo.
echo [1/4] Copying popup image to React assets...
copy "images\unsplash_a--1--Cmut8.jpg" "frontend\src\assets\popup-model.jpg"
echo Done.

echo.
echo [2/4] Setting up Django backend...
cd backend
pip install -r requirements.txt
python manage.py makemigrations newsletter
python manage.py migrate
echo.
echo Creating Django superuser (admin/admin123)...
echo from django.contrib.auth import get_user_model; U = get_user_model(); U.objects.filter(username='admin').exists() or U.objects.create_superuser('admin', 'admin@themart.com', 'admin123') | python manage.py shell
echo.
echo [3/4] Loading initial popup banner data...
python manage.py shell -c "from newsletter.models import PopupBanner; PopupBanner.objects.exists() or PopupBanner.objects.create(title='Subscribe Newsletter', subtitle='Subscribe the TheMart to get latest products and discount update.', is_active=True); print('Popup banner created.')"
cd ..

echo.
echo [4/4] Installing React dependencies...
cd frontend
npm install
cd ..

echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo To run the project:
echo   Backend:  cd backend ^& python manage.py runserver
echo   Frontend: cd frontend ^& npm start
echo.
echo Django Admin: http://127.0.0.1:8000/admin
echo   Username: admin
echo   Password: admin123
echo.
pause
