# Water Quality Monitor - Deployment Guide

## 🚀 Deployment Options

### Option 1: Railway.app (Recommended - Easiest)
Railway provides free PostgreSQL database and easy deployment.

### Option 2: Render.com (Good Alternative)
Render has free tier with PostgreSQL support.

### Option 3: Vercel + Railway/Render
Deploy frontend to Vercel, backend to Railway/Render.

## 📋 Pre-Deployment Checklist

- [ ] All code changes committed to git
- [ ] Environment variables prepared
- [ ] Database URL ready
- [ ] Frontend builds successfully
- [ ] Backend runs locally

## 🔧 Environment Variables Needed

```
DATABASE_URL=postgresql://user:password@host:port/database
SECRET_KEY=your_strong_random_secret_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## 🌐 Frontend Environment (for production)

Create `frontend/.env.production`:
```
VITE_API_URL=https://your-backend-url
```

## 📝 Deployment Steps

### Step 1: Prepare Code
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Deploy Backend + Database

#### Railway.app Deployment:
1. Go to https://railway.app
2. Sign up/Login with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will auto-detect railway.json and deploy
6. Add PostgreSQL database in Railway dashboard
7. Copy DATABASE_URL from Railway
8. Set environment variables in Railway:
   - SECRET_KEY (generate random string)
   - ALGORITHM=HS256
   - ACCESS_TOKEN_EXPIRE_MINUTES=30

#### Render.com Deployment:
1. Go to https://render.com
2. Connect GitHub repository
3. Create new Web Service from render.yaml
4. Create PostgreSQL database in Render
5. Set environment variables in Render dashboard

### Step 3: Deploy Frontend

#### Vercel (Recommended for Frontend):
1. Go to https://vercel.com
2. Import your GitHub repo
3. Set build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
4. Add environment variable:
   - VITE_API_URL=https://your-railway-backend-url

#### Or deploy frontend with backend on Railway/Render

## 🔍 Testing Deployment

After deployment, test these endpoints:
- GET https://your-backend-url/ → `{"message": "API running"}`
- GET https://your-backend-url/test-db → Database connection
- Frontend loads and can register/login

## 🐛 Common Issues & Fixes

### Database Connection Error
- Check DATABASE_URL format
- Ensure PostgreSQL is running
- Verify database credentials

### CORS Issues
- Update CORS origins in backend/main.py for production domain

### Frontend API Calls Fail
- Check VITE_API_URL environment variable
- Ensure backend URL is correct

### Build Failures
- Check build logs for specific errors
- Ensure all dependencies are in requirements.txt/package.json

## 💡 Pro Tips

1. Use Railway for easiest full-stack deployment
2. Test locally before deploying
3. Keep environment variables secure
4. Monitor logs after deployment
5. Set up automatic deployments from git pushes

## 📞 Support

If deployment fails, check:
1. Railway/Render deployment logs
2. Environment variables are set correctly
3. Database is accessible
4. CORS settings allow your frontend domain