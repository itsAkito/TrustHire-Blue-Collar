# Environment Configuration Guide

## .env File Setup

### Step 1: Create .env file from template
```bash
cp .env.example .env
```

### Step 2: Update the API Base URL

Edit the `.env` file and set your backend API URL:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Configuration by Environment

#### Development
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

#### Production (Example)
```env
VITE_API_BASE_URL=https://api.trusthire.com/api
```

#### Staging
```env
VITE_API_BASE_URL=https://staging-api.trusthire.com/api
```

## Available Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| VITE_API_BASE_URL | http://localhost:5000/api | Backend API endpoint |

## How to Add More Variables

1. Add to `.env` file:
   ```env
   VITE_APP_NAME=TrustHire
   VITE_VERSION=1.0.0
   ```

2. Access in code:
   ```javascript
   const appName = import.meta.env.VITE_APP_NAME;
   const version = import.meta.env.VITE_VERSION;
   ```

## Important Notes

- ⚠️ **Never commit `.env` file to git** - only `.env.example`
- ✅ Add `.env` to `.gitignore` if not already
- 🔒 Never put sensitive data like passwords in .env
- ⚠️ All VITE_ prefixed variables are exposed to client-side code

## Verifying Configuration

After setting up `.env`, verify by checking the API service:

1. Start the app: `npm run dev`
2. Open browser console
3. Check if API calls are going to correct URL:
   ```javascript
   // In browser console
   fetch('http://localhost:5000/api/jobs')
     .then(r => r.json())
     .then(d => console.log(d))
   ```

## Troubleshooting

### API calls going to wrong URL
- Check `.env` file has correct VITE_API_BASE_URL
- Restart dev server after changing .env
- Clear browser cache

### CORS errors
- Ensure backend has CORS enabled
- Verify backend is running on correct port
- Check backend CORS configuration

### 404 errors
- Verify backend API endpoints exist
- Check API URL matches backend routes
- Ensure backend is running

## Development Server Setup

Ensure your backend is running on the URL specified in `.env`:

```bash
# If using Node.js backend on port 5000
node server.js

# If using Python backend on port 5000
python app.py

# If using other ports, update VITE_API_BASE_URL accordingly
VITE_API_BASE_URL=http://localhost:YOUR_PORT/api
```

---

Once configured, the frontend will automatically use the specified API base URL for all API calls.
