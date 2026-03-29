# Water Quality Monitor - Render + Vercel Deployment Guide

## 🚀 Deployment Order & Steps

### **Step 1: Create Database (PostgreSQL)**
1. Go to https://render.com
2. Click "New" → "PostgreSQL"
3. Choose Free plan
4. Name: `water-quality-db`
5. Click "Create Database"
6. **Copy the DATABASE_URL** from Connections tab

### **Step 2: Deploy Backend (Python/FastAPI)**
1. Click "New" → "Web Service"
2. Connect your GitHub repo
3. Configure:
   - Name: `water-quality-backend`
   - Environment: Python
   - Build Command: `pip install -r backend/requirements.txt`
   - Start Command: `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT`
4. **Set Environment Variables:**
   - DATABASE_URL: [from your PostgreSQL database]
   - SECRET_KEY: [generate random string]
   - ALGORITHM: HS256
   - ACCESS_TOKEN_EXPIRE_MINUTES: 30
5. Click "Create Web Service"
6. **Copy the backend URL** (e.g., https://water-quality-backend.onrender.com)

### **Step 3: Deploy Frontend (React/Vite)**
1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repo
4. Configure:
   - Framework: Vite
   - Root Directory: frontend
   - Build Command: npm run build
   - Output Directory: dist
5. **Set Environment Variable:**
   - VITE_API_URL: [your Render backend URL]
6. Click "Deploy"

## 📋 Environment Variables Summary

### Render Backend:
```
DATABASE_URL=postgresql://user:pass@host:port/db
SECRET_KEY=your_random_secret_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Vercel Frontend:
```
VITE_API_URL=https://your-backend.onrender.com
```

## ✅ Final URLs
- Backend: https://water-quality-backend.onrender.com
- Frontend: https://water-quality-monitor.vercel.app