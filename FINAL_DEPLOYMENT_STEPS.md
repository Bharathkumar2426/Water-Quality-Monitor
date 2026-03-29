# 🚀 FINAL DEPLOYMENT STEPS - Render + Vercel

## STEP 1: CREATE DATABASE (Render.com)

### 1.1 Go to Render
- Open: https://render.com
- Sign in with your account

### 1.2 Create New PostgreSQL Database
- Click the **purple "New" button** (top right)
- Click **"PostgreSQL"** from dropdown

### 1.3 Configure Database
**Name field:** Type exactly: `water-quality-db`

**Database field:** Leave as default (auto-generated)

**Region dropdown:** Choose: `Oregon (us-west-2)` or any US region

**PostgreSQL Version dropdown:** Choose: `16` or latest

**Plan dropdown:** Choose: `Free`

### 1.4 Create Database
- Click the **"Create Database"** button
- Wait 2-3 minutes for creation

### 1.5 Get Database URL
- After creation, go to **"Connections" tab**
- **Copy the "External Database URL"**
- It looks like: `postgresql://user:password@host:port/database`
- **Save this URL** - you'll need it for backend

---

## STEP 2: DEPLOY BACKEND (Render.com)

### 2.1 Create New Web Service
- In Render dashboard, click **"New"** button
- Click **"Web Service"** from dropdown

### 2.2 Connect Repository
- Click **"Connect your GitHub account"** (if not connected)
- Search for your repository: `Water-Quality-Monitor`
- Click on your repository
- Click **"Connect"**

### 2.3 Configure Web Service
**Name field:** Type exactly: `water-quality-backend`

**Environment dropdown:** Select: `Python 3`

**Region dropdown:** Select: `Oregon (us-west-2)` or same as database

**Plan dropdown:** Select: `Free`

**Build Command field:** Type exactly:
```
pip install -r backend/requirements.txt
```

**Start Command field:** Type exactly:
```
cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT
```

### 2.4 Add Environment Variables
Click **"Add Environment Variable"** four times and enter:

| Variable Name | Value |
|---------------|-------|
| `DATABASE_URL` | **Paste your database URL here** (from step 1.5) |
| `SECRET_KEY` | `X7zP9mQ2vL8kR4nT6wY1sH3jF5gD9aB7cE2iK4mN8pQ6rS9tU1vW3xY5zA2bC4dE6fG8hI0jK2lM4nO6pQ8rS0tU2vW4xY6z` |
| `ALGORITHM` | `HS256` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `30` |

### 2.5 Deploy Backend
- Click **"Create Web Service"** button
- Wait 5-10 minutes for deployment
- **Copy your backend URL** from the top (looks like: `https://water-quality-backend.onrender.com`)

---

## STEP 3: DEPLOY FRONTEND (Vercel.com)

### 3.1 Go to Vercel
- Open: https://vercel.com
- Sign in with your account

### 3.2 Import Project
- Click **"New Project"** button
- Click **"Import Git Repository"**
- Search for: `Water-Quality-Monitor`
- Click on your repository
- Click **"Import"**

### 3.3 Configure Project
**Project Name field:** Type: `water-quality-monitor` (or your choice)

**Framework Preset dropdown:** Select: `Vite`

**Root Directory field:** Type exactly: `frontend`

**Build Command field:** Type exactly: `npm run build`

**Output Directory field:** Type exactly: `dist`

**Install Command field:** Type exactly: `npm install`

### 3.4 Add Environment Variable
- Scroll down to **"Environment Variables"** section
- Click **"Add"**
- **Name field:** Type: `VITE_API_URL`
- **Value field:** Paste your backend URL (from step 2.5)
- Example: `https://water-quality-backend.onrender.com`

### 3.5 Deploy Frontend
- Click **"Deploy"** button
- Wait 3-5 minutes for deployment
- **Copy your frontend URL** (looks like: `https://water-quality-monitor.vercel.app`)

---

## ✅ TESTING YOUR DEPLOYMENT

### Test Backend:
1. Open: `https://water-quality-backend.onrender.com/`
2. Should show: `{"message": "API running"}`

### Test Database Connection:
1. Open: `https://water-quality-backend.onrender.com/test-db`
2. Should show: `{"status": "Database connected"}`

### Test Frontend:
1. Open your Vercel URL
2. Try registering a new user
3. Try logging in
4. Dashboard should work

---

## 🎯 FINAL CHECKLIST

- [ ] Database created in Render
- [ ] DATABASE_URL copied
- [ ] Backend deployed with 4 environment variables
- [ ] Backend URL copied
- [ ] Frontend deployed with VITE_API_URL
- [ ] Frontend URL working
- [ ] Registration/login working
- [ ] Dashboard accessible

---

## 🚨 IF SOMETHING FAILS

**Database Issues:**
- Check DATABASE_URL format
- Make sure PostgreSQL is running

**Backend Issues:**
- Check Render logs for errors
- Verify all 4 environment variables are set

**Frontend Issues:**
- Check Vercel build logs
- Verify VITE_API_URL is correct

**CORS Issues:**
- Add your Vercel domain to backend CORS settings

---

## 📱 YOUR FINAL URLs
- **Backend:** `https://water-quality-backend.onrender.com`
- **Frontend:** `https://water-quality-monitor.vercel.app`

**SUCCESS!** Your water quality monitoring app is now live! 🌊