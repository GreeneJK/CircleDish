# Circle Dish Deployment Checklist

## Architecture Overview

Circle Dish uses a **Decoupled Monorepo** strategy:

- **Frontend**: Next.js (deployed to Vercel)
- **Backend**: Flask API (deployed to Railway)
- **Database**: Supabase (PostgreSQL with Row Level Security)

---

## 🚀 Vercel Deployment (Frontend)

### Pre-Deployment Setup

1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your GitHub repository: `CircleDish`

2. **Configure Build Settings**
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend/`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

3. **Environment Variables**
   
   Add the following in Vercel Dashboard → Settings → Environment Variables:

   ```
   NEXT_PUBLIC_API_URL=https://your-railway-app.railway.app
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_APP_URL=https://circledish.com
   NEXT_PUBLIC_APP_NAME=Circle Dish
   ```

   **Important**: Set these for all environments (Production, Preview, Development)

4. **Custom Domain** (Optional)
   - Go to Settings → Domains
   - Add `circledish.com` and `www.circledish.com`
   - Configure DNS records as instructed by Vercel

### Deployment Checklist

- [ ] Repository connected to Vercel
- [ ] Root directory set to `frontend/`
- [ ] All environment variables configured
- [ ] Custom domain configured (if applicable)
- [ ] Preview deployments enabled for pull requests
- [ ] Production deployment successful
- [ ] Test landing page loads correctly
- [ ] Verify API health check works from frontend

---

## 🚂 Railway Deployment (Backend)

### Pre-Deployment Setup

1. **Create New Project**
   - Go to [Railway Dashboard](https://railway.app/dashboard)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `CircleDish` repository

2. **Configure Service Settings**
   - **Service Name**: `circle-dish-api`
   - **Root Directory**: `backend/`
   - **Start Command**: Railway auto-detects `Procfile` (uses `gunicorn app:app`)

3. **Environment Variables**
   
   Add the following in Railway Dashboard → Variables:

   ```
   FLASK_ENV=production
   PORT=5001
   CORS_ALLOWED_ORIGINS=https://circledish.com,https://circledish.vercel.app,https://*.vercel.app
   
   # Supabase
   SUPABASE_URL=https://xxxxx.supabase.co
   SUPABASE_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_KEY=your_supabase_service_role_key
   
   # Database
   DATABASE_URL=postgresql://postgres:[password]@db.xxxxx.supabase.co:5432/postgres
   
   # Security
   SECRET_KEY=generate_a_secure_random_key_here
   JWT_SECRET_KEY=generate_another_secure_random_key_here
   ```

   **Generate secure keys**:
   ```bash
   python -c "import secrets; print(secrets.token_hex(32))"
   ```

4. **Custom Domain** (Optional)
   - Go to Settings → Domains
   - Add custom domain: `api.circledish.com`
   - Configure CNAME record as instructed by Railway

### Deployment Checklist

- [ ] Repository connected to Railway
- [ ] Root directory set to `backend/`
- [ ] All environment variables configured
- [ ] Python runtime detected (3.11.7)
- [ ] `Procfile` detected and used
- [ ] Production deployment successful
- [ ] Health check endpoint accessible: `https://your-app.railway.app/health`
- [ ] CORS configured to allow Vercel domain
- [ ] Database connection successful

---

## 🗄️ Supabase Setup

### Database Configuration

1. **Create Project**
   - Go to [Supabase Dashboard](https://app.supabase.com)
   - Create new project
   - Note your project URL and API keys

2. **Database Schema** (Coming in Phase 2)
   - Tables: `users`, `circles`, `circle_members`, `recipes`, `recipe_circles`, `comments`, `invitations`
   - Row Level Security (RLS) policies for privacy

3. **Get Connection Details**
   - Go to Settings → Database
   - Copy the connection string for `DATABASE_URL`
   - Get API keys from Settings → API

### Supabase Checklist

- [ ] Project created
- [ ] Project URL and keys saved securely
- [ ] Connection string configured in Railway
- [ ] Anon key configured in Vercel
- [ ] Database accessible from Railway backend

---

## 🔒 Security Checklist

- [ ] All `.env` files added to `.gitignore`
- [ ] No secrets committed to repository
- [ ] CORS properly configured with specific origins
- [ ] Supabase RLS policies enabled
- [ ] HTTPS enforced on all domains
- [ ] Environment variables set in deployment platforms (not in code)

---

## ✅ Post-Deployment Validation

### Frontend Validation

1. Visit `https://circledish.com` (or Vercel preview URL)
2. Verify landing page loads correctly
3. Check browser console for errors
4. Test responsive design on mobile

### Backend Validation

1. Test health endpoint:
   ```bash
   curl https://your-railway-app.railway.app/health
   ```
   
   Expected response:
   ```json
   {
     "status": "healthy",
     "service": "Circle Dish API",
     "version": "1.0.0"
   }
   ```

2. Test CORS from frontend:
   - Open browser console on your Vercel deployment
   - Run: `fetch('https://your-railway-app.railway.app/health').then(r => r.json()).then(console.log)`
   - Should return health check response without CORS errors

### Integration Validation

- [ ] Frontend can successfully call backend `/health` endpoint
- [ ] No CORS errors in browser console
- [ ] API responses are properly formatted
- [ ] Environment variables correctly loaded in both services

---

## 🔄 Continuous Deployment

Both Vercel and Railway automatically deploy when you push to your main branch:

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

2. **Automatic Deployments**:
   - Vercel: Deploys frontend automatically
   - Railway: Deploys backend automatically

3. **Preview Deployments** (Vercel):
   - Every pull request gets a unique preview URL
   - Test changes before merging to main

---

## 📊 Monitoring & Logs

### Vercel Logs
- Dashboard → Your Project → Deployments → Click deployment → View Logs

### Railway Logs
- Dashboard → Your Service → Deployments → View Logs
- Real-time logs available in the Railway CLI

---

## 🆘 Troubleshooting

### Frontend Issues

**Problem**: API calls failing with CORS errors
- **Solution**: Verify `CORS_ALLOWED_ORIGINS` in Railway includes your Vercel domain

**Problem**: Environment variables not loading
- **Solution**: Ensure variables are prefixed with `NEXT_PUBLIC_` for client-side access

### Backend Issues

**Problem**: 502 Bad Gateway
- **Solution**: Check Railway logs, ensure `Procfile` is correct and dependencies installed

**Problem**: Database connection failed
- **Solution**: Verify `DATABASE_URL` format and Supabase project is active

---

## 📝 Next Steps After Deployment

1. Set up custom domains for production
2. Configure email service (SendGrid) for invitations
3. Implement authentication with Supabase Auth
4. Set up monitoring and error tracking (Sentry)
5. Configure CI/CD tests before deployment
6. Set up database migrations strategy

---

## 🔗 Useful Links

- **Vercel Documentation**: https://vercel.com/docs
- **Railway Documentation**: https://docs.railway.app
- **Supabase Documentation**: https://supabase.com/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **Flask Documentation**: https://flask.palletsprojects.com
