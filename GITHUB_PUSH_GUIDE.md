# GitHub Push & Deployment Checklist

## ✅ Pre-Push Verification

### 1. Verify .env Files Are Protected

**Backend**:
```bash
cd server
git status

# ✅ CORRECT: .env should NOT appear
# ❌ WRONG: .env appears in "untracked files"
```

**Frontend**:
```bash
cd trusthire
git status

# ✅ CORRECT: .env should NOT appear
# ❌ WRONG: .env appears in "untracked files"
```

If .env files are showing, remove them from tracking:
```bash
git rm --cached .env
git commit -m "Remove .env from tracking"
```

### 2. Verify .env.example Files Exist

```bash
# Backend
ls server/.env.example

# Frontend
ls trusthire/.env.example

# Both should exist with template values
```

### 3. Verify .gitignore Files Are Correct

```bash
# Check backend
cat server/.gitignore | grep -E "^\.env"

# Check frontend
cat trusthire/.gitignore | grep -E "^\.env"

# Both should contain:
# .env
# .env.local
# .env.*.local
```

---

## 🔄 First Time GitHub Push

### Step 1: Initialize Git (if not already done)

```bash
cd "TrustHire-Blue Collar Platform"

# Check if git is initialized
git status

# If not, initialize:
git init
git config user.name "Your Name"
git config user.email "your@email.com"
```

### Step 2: Add Remote Repository

```bash
# Replace with your actual GitHub repo URL
git remote add origin https://github.com/yourusername/trusthire-platform.git

# Verify remote
git remote -v
```

### Step 3: Create Initial Commit

```bash
# Stage all files (except .env due to .gitignore)
git add .

# Verify what will be committed
git status

# Create first commit
git commit -m "Initial commit: TrustHire Platform setup

- Backend: Express API with PostgreSQL
- Frontend: React + Vite with Tailwind CSS
- Features: OTP auth, job management, notifications
- Models: User, Job, Application, Notification, Review, Employee
- Deployment ready for Render (backend) + Vercel (frontend)"
```

### Step 4: Push to GitHub

```bash
# For first push
git branch -M main
git push -u origin main

# For subsequent pushes
git push origin main
```

---

## 📝 Regular Development Workflow

### For Each Feature/Fix:

```bash
# 1. Create feature branch
git checkout -b feature/descriptive-name

# 2. Make changes
# Edit files...

# 3. Verify nothing sensitive is staged
git status | grep ".env"

# 4. Stage changes
git add .

# 5. Commit with clear message
git commit -m "Feature: Add notification system

- Created Notification model with 8 types
- Added notification controller and routes
- Integrated real-time notification updates"

# 6. Push feature branch
git push origin feature/descriptive-name

# 7. Create Pull Request on GitHub (for team review)
```

---

## 🚀 Deployment After Push

### Option A: Render (Backend)

1. Go to https://render.com
2. Click "New" → "Web Service"
3. Connect GitHub account
4. Select `trusthire-platform` repository
5. Configure:
   - **Name**: trusthire-backend
   - **Branch**: main
   - **Root Directory**: server
   - **Runtime**: Node
   - **Build Command**: npm install
   - **Start Command**: npm start
6. Click "Create Web Service"
7. Add environment variables in Render dashboard:
   ```
   DATABASE_URL=...
   JWT_SECRET=...
   SMTP_PASSWORD=...
   (all from your .env file)
   ```
8. Deploy! (automatically redeploys on push to main)

**Result**: `https://trusthire-backend-xxxxx.onrender.com`

### Option B: Vercel (Frontend)

1. Go to https://vercel.com
2. Click "Add New..." → "Project"
3. Import GitHub repository
4. Configure:
   - **Framework**: Vite
   - **Root Directory**: trusthire
   - **Build Command**: npm run build
   - **Output Directory**: dist
5. Add environment variable:
   ```
   VITE_API_BASE_URL=https://trusthire-backend-xxxxx.onrender.com/api
   ```
6. Click "Deploy"
7. (automatically redeploys on push to main)

**Result**: `https://trusthire-xxxxx.vercel.app`

---

## 🔗 Connect Frontend to Backend

After both are deployed:

### 1. Update Backend Environment (Render Dashboard)

Add:
```
FRONTEND_URL=https://trusthire-xxxxx.vercel.app
```

### 2. Update Frontend Environment (Vercel Dashboard)

Add:
```
VITE_API_BASE_URL=https://trusthire-backend-xxxxx.onrender.com/api
```

### 3. Redeploy Both

- **Backend**: Render automatically redeploys when env vars change
- **Frontend**: Manually redeploy on Vercel dashboard or push code change

---

## ✨ After Successful Deployment

### Test the Live App

1. **Visit Frontend**: https://trusthire-xxxxx.vercel.app
2. **Test Worker Signup**: Create account with email
3. **Verify OTP Email**: Check inbox for OTP code
4. **Test Admin Dashboard**: Login with admin credentials
5. **Verify Real Data**: Should show actual counts from database

### Monitor Logs

**Backend Logs** (Render):
- Go to Web Service → Logs tab
- Watch for errors

**Frontend Logs** (Vercel):
- Go to Deployments → Logs
- Check for build errors

---

## 🔧 Making Updates

### Workflow for Bug Fixes & Features

```bash
# 1. Create feature branch
git checkout -b fix/bug-name

# 2. Make changes
# Edit files...

# 3. Test locally
cd server && npm test
cd ../trusthire && npm run build

# 4. Commit and push
git add .
git commit -m "Fix: Clear bug description"
git push origin fix/bug-name

# 5. Render & Vercel auto-redeploy on push!
```

---

## ⚠️ IMPORTANT: Protecting Sensitive Data

### Never Commit:
- ❌ .env files
- ❌ API keys
- ❌ Database passwords
- ❌ JWT secrets
- ❌ Private credentials

### Always Use:
- ✅ .env.example templates
- ✅ Environment variables in Render/Vercel
- ✅ .gitignore to protect files
- ✅ Secrets management tools

### If You Accidentally Commit Sensitive Data:

```bash
# Remove from history (CRITICAL!)
git rm --cached .env
git commit -m "Remove .env from tracking"
git push

# Force update remote history
# WARNING: Only do if not shared with team yet!
# git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch .env' HEAD

# Change ALL credentials immediately!
# Rotate database password
# Generate new API keys
# Create new JWT secret
```

---

## 📊 GitHub Repository Settings

### Recommended Settings:

1. **Visibility**: Public (for portfolio) or Private (for security)
2. **Branch Protection** (main):
   - ✅ Require pull request reviews
   - ✅ Require status checks to pass
   - ✅ Require branches to be up to date
3. **Secrets** (don't use, use Render/Vercel instead):
   - Create for sensitive data if using GitHub Actions
4. **.gitignore**: Already configured ✅

---

## 🚨 Troubleshooting

### "fatal: 'origin' does not appear to be a 'git' repository"

```bash
git remote add origin https://github.com/yourusername/trusthire-platform.git
git push -u origin main
```

### ".env file still appearing in status"

```bash
# Remove from cache
git rm --cached .env server/.env trusthire/.env

# Verify .gitignore has .env
cat .gitignore | grep "^.env"

# Commit
git commit -m "Remove .env files from tracking"
git push
```

### "Render/Vercel not deploying"

1. Check GitHub account is connected
2. Verify repository branch is set to "main"
3. Check environment variables are set
4. Look at deployment logs for errors
5. Force rebuild on platform dashboard

### "OTP emails not sending in production"

```bash
# Verify in Render environment variables:
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-gmail-app-password  # NOT regular password!
```

See: https://myaccount.google.com/apppasswords

---

## 📞 Deployment Contacts

- **GitHub Issues**: Create issue in repository
- **Render Support**: https://render.com/support
- **Vercel Support**: https://vercel.com/support
- **Neon Support**: https://neon.tech/support

---

## 🎯 Summary

| Step | Command | Platform |
|------|---------|----------|
| **Clone** | `git clone ...` | GitHub |
| **Setup** | `npm install` | Local |
| **Dev** | `npm start` / `npm run dev` | Local |
| **Push** | `git push origin main` | GitHub |
| **Deploy Backend** | Connect repo | Render |
| **Deploy Frontend** | Connect repo | Vercel |
| **Monitor** | Check logs | Render/Vercel |

---

**Your app is now ready for production! 🚀**

*Guide Version: 1.0 | Last Updated: February 2026*
