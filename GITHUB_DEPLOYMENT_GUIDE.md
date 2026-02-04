# GitHub Setup & Deployment Guide

## 🚀 Quick Start

This project is designed to be deployed with:
- **Backend**: Render (https://render.com)
- **Frontend**: Vercel (https://vercel.com)

---

## 📋 Prerequisites

1. GitHub account (https://github.com)
2. Render account (https://render.com)
3. Vercel account (https://vercel.com)
4. Neon PostgreSQL account (https://neon.tech)

---

## 🔐 Security: .env Files

**⚠️ IMPORTANT: Never commit .env files to GitHub!**

Both backend and frontend have `.gitignore` files that protect:
- `server/.env` - Backend secrets (Database URL, API keys, SMTP credentials)
- `trusthire/.env` - Frontend environment variables

### Before pushing to GitHub:
```bash
# Verify .env files are ignored
git status

# You should NOT see .env files listed
```

---

## 🔧 Backend Setup (Render Deployment)

### Step 1: Create .env on Render

When deploying on Render, add these environment variables in the dashboard:

```
DATABASE_URL=postgresql://...your-neon-url...
PORT=5000
NODE_ENV=production

JWT_SECRET=your_secure_jwt_secret_key
JWT_EXPIRE=7d

ADMIN_EMAIL=your_email@example.com
ADMIN_PASSWORD=your_secure_password

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_gmail_app_password
SMTP_FROM="TrustHire <no-reply@trusthire.com>"

TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=+your_twilio_number

CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

FRONTEND_URL=https://your-vercel-frontend-url.vercel.app
```

### Step 2: Deploy Backend

1. Push code to GitHub
2. Go to https://render.com
3. Create New → Web Service
4. Connect GitHub repository
5. Configuration:
   - **Name**: `trusthire-backend`
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or Starter)
6. Add Environment Variables (see Step 1)
7. Click "Deploy"

Your backend will be available at: `https://trusthire-backend-xxxxx.onrender.com`

---

## 🎨 Frontend Setup (Vercel Deployment)

### Step 1: Create .env.local for Frontend

In `trusthire/.env.local` (or `.env` for Vercel):

```
VITE_API_BASE_URL=https://trusthire-backend-xxxxx.onrender.com/api
VITE_APP_NAME=TrustHire
VITE_APP_VERSION=1.0.0
```

**Note**: For local development, use:
```
VITE_API_BASE_URL=http://localhost:5000/api
```

### Step 2: Deploy Frontend

1. Push code to GitHub
2. Go to https://vercel.com
3. Click "Add New..." → Project
4. Import GitHub repository
5. Configuration:
   - **Framework**: Vite
   - **Root Directory**: `trusthire`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Add Environment Variables:
   - `VITE_API_BASE_URL`: `https://your-backend-url.onrender.com/api`
7. Click "Deploy"

Your frontend will be available at: `https://trusthire-xxxxx.vercel.app`

---

## 🔗 Connect Frontend to Backend

After both are deployed:

1. Update backend's `FRONTEND_URL` environment variable on Render:
   ```
   FRONTEND_URL=https://trusthire-xxxxx.vercel.app
   ```

2. Update frontend's `VITE_API_BASE_URL` on Vercel:
   ```
   VITE_API_BASE_URL=https://trusthire-backend-xxxxx.onrender.com/api
   ```

3. Redeploy both services

---

## 📧 Email (OTP) Configuration

For OTP emails to work in production:

### Gmail Setup (Recommended):
1. Enable 2-Factor Authentication on your Gmail account
2. Go to https://myaccount.google.com/apppasswords
3. Create an "App Password" for Mail on Windows/Linux
4. Copy this password and use it as `SMTP_PASSWORD` in Render environment

### Alternative: Use SendGrid or Mailgun
- SendGrid: https://sendgrid.com (free tier available)
- Mailgun: https://mailgun.com (free tier available)

Update `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD` accordingly.

---

## 📱 SMS (OTP) Configuration

For SMS OTP delivery:

1. Sign up at https://www.twilio.com
2. Create a Twilio Project
3. Get your Account SID and Auth Token
4. Purchase a Twilio Phone Number
5. Add to Render environment variables:
   ```
   TWILIO_ACCOUNT_SID=your_account_sid
   TWILIO_AUTH_TOKEN=your_auth_token
   TWILIO_PHONE_NUMBER=+1234567890
   ```

---

## 📸 Image Upload Configuration

For image uploads to work:

1. Sign up at https://cloudinary.com (free tier available)
2. Get your Cloud Name, API Key, and API Secret
3. Add to Render environment variables:
   ```
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

---

## 🧪 Testing Deployed App

### Test OTP Email:
1. Go to frontend signup page
2. Register with your email
3. You should receive OTP email within 30 seconds
4. Enter OTP to verify email

### Test API Connectivity:
```bash
# Backend health check
curl https://your-backend-url.onrender.com/health

# Should return:
# {"success":true,"status":"Server is running","timestamp":"..."}
```

### Test Database:
Admin Dashboard will show live counts from database

---

## 🔄 Continuous Deployment

Both Render and Vercel automatically redeploy when you push to GitHub:

1. Make code changes
2. Commit and push to GitHub
3. Render/Vercel automatically redeploy
4. Your app is updated!

---

## 🆘 Troubleshooting

### Backend not receiving requests from Frontend:
- Check `FRONTEND_URL` is correct in Render environment
- Check CORS is properly configured in `server/src/index.js`
- Check `VITE_API_BASE_URL` is correct in Vercel environment

### OTP emails not sending:
- Verify `SMTP_PASSWORD` is correct (use Gmail app password, not regular password)
- Check `SMTP_USER` email is correct
- Enable "Less secure app access" if not using Gmail app password

### Database connection errors:
- Verify `DATABASE_URL` from Neon is correct
- Check Neon IP whitelist includes Render's IPs
- Test database locally before deploying

### Images not uploading:
- Verify `CLOUDINARY_API_SECRET` is correct (keep this secret!)
- Check Cloudinary account has upload quota remaining
- Verify file size is under 5MB

---

## 📝 Project Structure

```
TrustHire-Blue Collar Platform/
├── server/
│   ├── .env                 (❌ NOT committed - add to Render)
│   ├── .env.example         (✅ Committed - template for .env)
│   ├── .gitignore          (✅ Protects .env)
│   ├── src/
│   │   ├── index.js        (Express server)
│   │   ├── config/         (Database config)
│   │   ├── routes/         (API endpoints)
│   │   ├── controllers/    (Business logic)
│   │   └── models/         (Database models)
│   └── package.json
│
└── trusthire/
    ├── .env                (❌ NOT committed - add to Vercel)
    ├── .env.example        (✅ Committed - template)
    ├── .gitignore         (✅ Protects .env)
    ├── src/
    │   ├── main.jsx       (React entry)
    │   ├── App.jsx        (Routes)
    │   ├── pages/         (Page components)
    │   ├── components/    (Reusable components)
    │   └── services/      (API calls)
    └── package.json
```

---

## 🎯 Summary

| Component | Service | URL Pattern |
|-----------|---------|-------------|
| **Backend API** | Render | `https://trusthire-backend-xxxxx.onrender.com` |
| **Frontend App** | Vercel | `https://trusthire-xxxxx.vercel.app` |
| **Database** | Neon | `postgresql://user:pass@ep-xxxxx.neon.tech/db` |

---

## 📚 Useful Links

- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- Neon Docs: https://neon.tech/docs
- Express.js: https://expressjs.com
- React/Vite: https://vitejs.dev

---

**Last Updated**: February 2026
**Version**: 1.0.0
