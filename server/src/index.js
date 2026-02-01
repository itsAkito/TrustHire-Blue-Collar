import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import sequelize from './config/database.js';
import { errorHandler } from './middleware/errorHandler.js';

// Import routes
import userRoutes from './routes/userRoutes.js';
import employerRoutes from './routes/employerRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

// Import models
import User from './models/User.js';
import Job from './models/Job.js';
import Application from './models/Application.js';
import Review from './models/Review.js';
import Employee from './models/Employee.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware - CORS Configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:5174',
      'http://127.0.0.1:5175',
      process.env.FRONTEND_URL
    ].filter(Boolean);
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Define associations
User.hasMany(Job, { foreignKey: 'employerId', as: 'postedJobs' });
User.hasMany(Application, { foreignKey: 'workerId', as: 'applications' });
User.hasMany(Review, { foreignKey: 'reviewerId', as: 'givenReviews' });
User.hasMany(Review, { foreignKey: 'revieweeId', as: 'receivedReviews' });
User.hasMany(Employee, { foreignKey: 'employerId', as: 'employees' });

Job.belongsTo(User, { foreignKey: 'employerId', as: 'employer' });
Job.hasMany(Application, { foreignKey: 'jobId', as: 'applications' });

Application.belongsTo(Job, { foreignKey: 'jobId', as: 'job' });
Application.belongsTo(User, { foreignKey: 'workerId', as: 'worker' });

Review.belongsTo(User, { foreignKey: 'reviewerId', as: 'reviewer' });
Review.belongsTo(User, { foreignKey: 'revieweeId', as: 'reviewee' });

Employee.belongsTo(User, { foreignKey: 'employerId', as: 'employer' });

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ success: true, status: 'Server is running', timestamp: new Date().toISOString() });
});

// API info endpoint
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'TrustHire API',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      admin: '/api/admin',
      employers: '/api/employers',
      jobs: '/api/jobs',
      applications: '/api/applications',
    },
  });
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/employers', employerRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Initialize default credentials
const initializeDefaultCredentials = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@trusthire.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';
    const userEmail = process.env.USER_EMAIL || 'user@trusthire.com';
    const userName = process.env.USER_NAME || 'Demo User';
    const userPassword = process.env.USER_PASSWORD || 'User@123';

    // Create admin if not exists
    const adminExists = await User.findOne({ where: { email: adminEmail } });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await User.create({
        name: 'Admin User',
        email: adminEmail,
        password: hashedPassword,
        phone: '+91-9999999999',
        role: 'admin',
        otpVerified: true,
        emailVerified: true,
        verified: true,
      });
      console.log(`✅ Admin created: ${adminEmail} / ${adminPassword}`);
    }

    // Create demo user if not exists
    const userExists = await User.findOne({ where: { email: userEmail } });
    if (!userExists) {
      const hashedPassword = await bcrypt.hash(userPassword, 10);
      await User.create({
        name: userName,
        email: userEmail,
        password: hashedPassword,
        phone: '+91-8888888888',
        role: 'worker',
        otpVerified: true,
        emailVerified: true,
        verified: true,
      });
      console.log(`✅ User created: ${userEmail} / ${userPassword}`);
    }
  } catch (error) {
    console.error('Error initializing credentials:', error);
  }
};

// Database sync and server startup
const startServer = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('Database connection established successfully');

    // Sync models with database
    await sequelize.sync({ alter: true });
    console.log('Database models synced');

    // Initialize default credentials
    await initializeDefaultCredentials();

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
      console.log(`📡 API URL: http://localhost:${PORT}/api`);
      console.log('\n📋 Login Credentials:');
      console.log(`Admin: ${process.env.ADMIN_EMAIL} / ${process.env.ADMIN_PASSWORD}`);
      console.log(`User: ${process.env.USER_EMAIL} / ${process.env.USER_PASSWORD}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
