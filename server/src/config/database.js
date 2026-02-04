import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    // Connection timeout settings
    statement_timeout: 30000, // 30 seconds
    idle_in_transaction_session_timeout: 30000,
    // keepalives to prevent connection drops
    keepalives: 1,
    keepalives_idle: 30,
  },
  pool: {
    max: 3,           // Reduced pool size
    min: 0,
    acquire: 30000,   // 30 seconds to acquire connection
    idle: 10000,      // 10 seconds idle timeout
    evict: 60000,     // Evict idle connections after 60 seconds
  },
  // Retry configuration
  retry: {
    max: 3,           // Retry failed connections 3 times
    match: [/ECONNRESET/, /ECONNREFUSED/, /ETIMEDOUT/, /SequelizeConnectionError/],
  },
});

// Test connection
sequelize
  .authenticate()
  .then(() => {
    console.log('✓ PostgreSQL connection established successfully');
  })
  .catch((err) => {
    console.error('✗ Database Connection Error:', err.message);
    console.error('');
    console.error('TROUBLESHOOTING STEPS:');
    console.error('1. If using Neon PostgreSQL:');
    console.error('   - Visit https://console.neon.tech');
    console.error('   - Verify your database is active');
    console.error('   - Copy the connection string and update .env');
    console.error('');
    console.error('2. If you prefer local PostgreSQL (development):');
    console.error('   - Install PostgreSQL locally');
    console.error('   - Create database: createdb trusthire');
    console.error('   - Update .env: DATABASE_URL=postgresql://postgres:password@localhost:5432/trusthire');
    console.error('   - Restart the server');
    console.error('');
    console.error('3. Current DATABASE_URL:', process.env.DATABASE_URL ? '***' : 'NOT SET');
    console.error('');
  });

export default sequelize;
