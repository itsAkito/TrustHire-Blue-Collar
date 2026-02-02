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
    console.log('✓ Neon PostgreSQL connection established successfully');
  })
  .catch((err) => {
    console.error('✗ Unable to connect to Neon PostgreSQL:', err.message);
    console.error('Please check your DATABASE_URL in .env file');
  });

export default sequelize;
