# TheMart - Newsletter Popup

## Project Structure
```
e commerce/
├── images/              ← Your existing images
├── backend/             ← Django REST API
│   ├── themart/         ← Django project settings
│   ├── newsletter/      ← Newsletter app (models, views, admin)
│   ├── manage.py
│   └── requirements.txt
├── frontend/            ← React app
│   ├── src/
│   │   ├── components/
│   │   │   ├── NewsletterPopup.js
│   │   │   └── NewsletterPopup.css
│   │   ├── assets/      ← popup-model.jpg goes here
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── setup.bat            ← One-click setup
```

## Quick Start

### Step 1 — Copy popup image
Copy any image from `images/` folder to `frontend/src/assets/popup-model.jpg`
(e.g., `unsplash_a--1--Cmut8.jpg`)

### Step 2 — Backend (Django)
```bash
cd backend
pip install -r requirements.txt
python manage.py makemigrations newsletter
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Step 3 — Add popup banner in Django Admin
1. Go to http://127.0.0.1:8000/admin
2. Login with your superuser
3. Click "Popup Banners" → Add
4. Upload an image, set title/subtitle, mark as active → Save

### Step 4 — Frontend (React)
```bash
cd frontend
npm install
npm start
```

## Features
- Popup appears 1 second after page load
- ✕ button closes the popup
- Click outside the modal to close
- Press Escape key to close
- Email stored in Django database
- Django Admin shows all subscribers
- Admin can change popup image/text from admin panel
- Duplicate email validation
- Success/error messages

## Colors & Font
- Pink: #FF8F9C
- White: #FFFFFF  
- Dark: #484848
- Font: Poppins (Google Fonts)

## API Endpoints
- POST /api/subscribe/ — Subscribe with email
- GET /api/popup/ — Get active popup banner data
