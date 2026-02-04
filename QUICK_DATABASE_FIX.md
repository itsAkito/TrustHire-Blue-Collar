# Quick Fix Guide - Database Connection Issue

## Current Problem
```
HostNotFoundError: getaddrinfo ENOTFOUND ep-noisy-thunder-a1x2xp65-pooler.ap-southeast-1.aws.neon.tech
```

## 5-Minute Quick Fix

### For Local PostgreSQL Development (Recommended)

**Step 1**: Install PostgreSQL
- **Windows**: Download from https://www.postgresql.org/download/windows/ and run installer
- **Mac**: Run `brew install postgresql` in terminal
- **Linux**: Run `sudo apt-get install postgresql` in terminal

**Step 2**: Start PostgreSQL
- **Windows**: PostgreSQL starts automatically on install
- **Mac**: Run `brew services start postgresql`
- **Linux**: Run `sudo systemctl start postgresql`

**Step 3**: Create Database
```bash
createdb trusthire
```

**Step 4**: Update `.env` File
Open: `server/.env`

Replace this line:
```
DATABASE_URL='postgresql://neondb_owner:npg_ZYwNEOc7P2hq@ep-noisy-thunder-a1x2xp65-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
```

With this:
```
DATABASE_URL='postgresql://postgres:postgres@localhost:5432/trusthire'
```

**Step 5**: Restart Server
```bash
cd server
npm run dev
```

You should see:
```
✓ PostgreSQL connection established successfully
```

---

## Alternative: Fix Neon Connection

If you want to keep using Neon:

1. Go to https://console.neon.tech
2. Login with your credentials
3. Check if database is running
4. Click "Connection Details"
5. Copy the entire connection string
6. Paste into `.env` as `DATABASE_URL`
7. Restart server

---

## Verify Everything Works

### Test Backend
```bash
cd server
npm run dev
# Should show: ✓ PostgreSQL connection established successfully
```

### Test Frontend
```bash
cd trusthire
npm run dev
# Should open app at http://localhost:5173
```

### Test Full App
1. Go to http://localhost:5173
2. Try to sign up as a worker
3. You should see success alert
4. Login should work
5. Home page should load jobs from database

---

## If Still Getting Errors

### Check PostgreSQL is Running
```bash
psql --version  # Should show version number
```

### Check Connection String
Make sure `.env` has correct format:
```
postgresql://username:password@host:port/database
```

### Check Database Exists
```bash
psql -l | grep trusthire
```

### View Server Logs
The server will now show detailed error messages if connection fails.

---

## Success Indicators ✅

- ✅ Server starts without database errors
- ✅ Home page loads with job cards
- ✅ Worker signup works with alerts
- ✅ Worker login works with profile showing in navbar
- ✅ All alerts (success/error/warning/info) display correctly
- ✅ Footer renders at bottom of pages
- ✅ Dark GOTH theme displays correctly

---

That's it! Your app should be fully functional now.
