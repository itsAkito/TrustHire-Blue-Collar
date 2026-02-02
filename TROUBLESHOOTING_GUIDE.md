# Troubleshooting Guide - Database Connection & Login Issues

## Issue 1: Database Connection Errors (ECONNRESET & Authentication Timeout)

### Problem
```
ConnectionError [SequelizeConnectionError]: read ECONNRESET
ConnectionError [SequelizeConnectionError]: Authentication timed out
```

### Root Cause Analysis
The PostgreSQL database (Neon) connection is being reset due to:
1. **Connection timeout** - Database taking too long to respond
2. **Network issues** - Connection dropped mid-request
3. **Database credentials** - Connection string might be invalid or expired
4. **Connection pool exhaustion** - Too many connections trying to use limited pool

### Solutions

#### Solution 1: Verify Database Connection String
Check your `.env` file has valid credentials:
```bash
# Database URL should be in format:
DATABASE_URL='postgresql://[user]:[password]@[host]/[database]?sslmode=require&channel_binding=require'
```

**Steps:**
1. Go to https://console.neon.tech
2. Log in and verify your connection string
3. Update `.env` with the latest connection string
4. Restart the server

#### Solution 2: Increase Connection Pool & Timeout Settings
Update `server/src/config/database.js`:

```javascript
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    // Add connection timeout settings
    statement_timeout: 30000, // 30 seconds
    idle_in_transaction_session_timeout: 30000,
  },
  pool: {
    max: 3,           // Reduce from 5 to 3
    min: 0,
    acquire: 30000,   // 30 seconds to acquire connection
    idle: 10000,      // 10 seconds idle timeout
    evict: 60000,     // Evict idle connections after 60 seconds
  },
  retry: {
    max: 3,           // Retry failed connections 3 times
    match: [/ECONNRESET/, /ECONNREFUSED/, /ETIMEDOUT/],
  },
});
```

#### Solution 3: Use Connection String Format for Neon
If using Neon Serverless with pooler:
```
postgresql://[user]:[password]@[host]-pooler.aws.neon.tech/[database]?sslmode=require
```

#### Solution 4: Check Network Connectivity
```bash
# Test if Neon database is reachable
node -e "require('pg').connect(process.env.DATABASE_URL, (err, client) => {
  if (err) console.error('Connection failed:', err);
  else { console.log('✓ Connected!'); client.end(); }
})"
```

---

## Issue 2: Login 401 Unauthorized Error

### Problem
```
POST http://localhost:5000/api/users/login 401 (Unauthorized)
User: jayan1504@gmail / jayant222
```

### Root Cause Analysis
The 401 error means authentication failed. Possible reasons:
1. **Incorrect credentials** - Wrong email or password
2. **User doesn't exist** - Email not found in database
3. **Email not verified** - User registered but didn't verify OTP
4. **Password hashing mismatch** - Password stored differently than being checked

### Solutions

#### Solution 1: Verify User Account Exists
Check if user exists in database using query:
```sql
SELECT id, email, emailVerified, otpVerified FROM users WHERE email = 'jayan1504@gmail.com';
```

If user doesn't exist, they need to register first via `/api/users/register`

#### Solution 2: Check Email Verification Status
Users must:
1. Register via signup form
2. Receive OTP via email
3. Verify OTP via `/api/users/verify-otp`
4. Only then can login

**Update login controller to check verification:**
```javascript
// In userController.js - login function
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if email is verified
    if (!user.otpVerified && !user.emailVerified) {
      return res.status(403).json({
        success: false,
        message: 'Please verify your email before logging in. Check your email for OTP.'
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // ... rest of login logic
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
```

#### Solution 3: Reset/Recreate Test User Account
For testing, you can:

1. **Option A: Delete and re-register**
   - Delete the user from database
   - Register again via `/api/users/register`
   - Verify OTP (check server logs for OTP)
   - Then login

2. **Option B: Create test user via admin panel**
   - Use admin credentials: `jayantkumar@gmail.com` / `Jayant@123`
   - Create new user account

#### Solution 4: Enable OTP Bypass for Development
Add to `.env`:
```
SKIP_OTP_VERIFICATION=true  # Only for development!
```

Then update verification endpoint:
```javascript
if (process.env.SKIP_OTP_VERIFICATION === 'true') {
  // Skip OTP check in development
  user.otpVerified = true;
  await user.save();
}
```

---

## Quick Diagnostic Command

Run this to test database and auth:
```bash
# Test database connection
curl -X GET http://localhost:5000/api/admin/dashboard/stats \
  -H "Authorization: Bearer YOUR_TOKEN"

# Test user login
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

---

## Next Steps

1. **Update database.js** with improved connection pooling
2. **Verify Neon connection string** in .env
3. **Check user verification status** for test account
4. **Restart server** and test login again
5. **Monitor server logs** for specific error messages

