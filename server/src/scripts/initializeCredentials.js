import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';
import sequelize from '../config/database.js';

dotenv.config();

/**
 * Initialize admin and user credentials in the database
 * Run this once to set up default credentials from .env file
 */

const initializeCredentials = async () => {
  try {
    // Connect to database
    await sequelize.authenticate();
    console.log('✓ Database connected');

    // Sync models
    await sequelize.sync({ alter: true });
    console.log('✓ Database models synced');

    // Admin credentials from .env
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@trusthire.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';

    // Employee credentials from .env
    const employeeEmail = process.env.USER_EMAIL || 'employee@trusthire.com';
    const employeeName = process.env.USER_NAME || 'Employee User';
    const employeePassword = process.env.USER_PASSWORD || 'Employee@123';

    // Check and create admin
    let admin = await User.findOne({ where: { email: adminEmail } });
    if (!admin) {
      const hashedAdminPassword = await bcrypt.hash(adminPassword, 10);
      admin = await User.create({
        name: 'Admin User',
        email: adminEmail,
        password: hashedAdminPassword,
        phone: '+91-9999999999',
        role: 'admin',
        otpVerified: true,
        emailVerified: true,
        verified: true,
      });
      console.log(`✓ Admin user created: ${adminEmail}`);
      console.log(`  Password: ${adminPassword}`);
    } else {
      console.log(`✓ Admin user already exists: ${adminEmail}`);
    }

    // Check and create employee
    let employee = await User.findOne({ where: { email: employeeEmail } });
    if (!employee) {
      const hashedEmployeePassword = await bcrypt.hash(employeePassword, 10);
      employee = await User.create({
        name: employeeName,
        email: employeeEmail,
        password: hashedEmployeePassword,
        phone: '+91-8888888888',
        role: 'worker',
        otpVerified: true,
        emailVerified: true,
        verified: true,
      });
      console.log(`✓ Employee user created: ${employeeEmail}`);
      console.log(`  Password: ${employeePassword}`);
    } else {
      console.log(`✓ Employee user already exists: ${employeeEmail}`);
    }

    console.log('\n✅ Credentials initialization complete!');
    console.log('\n--- Login Credentials ---');
    console.log('Admin Login:');
    console.log(`  Email: ${adminEmail}`);
    console.log(`  Password: ${adminPassword}`);
    console.log('\nEmployee Login:');
    console.log(`  Email: ${employeeEmail}`);
    console.log(`  Password: ${employeePassword}`);
    console.log('\nAPI Endpoints:');
    console.log('  Admin Login: POST /api/admin/login');
    console.log('  Employee Register: POST /api/users/register');
    console.log('  Employee Login: POST /api/users/login');
    console.log('  Verify OTP: POST /api/users/verify-otp');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error initializing credentials:', error);
    process.exit(1);
  }
};

initializeCredentials();
