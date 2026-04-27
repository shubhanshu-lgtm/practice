const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DATABASE_URL) {
  const maskedUrl = process.env.DATABASE_URL.replace(/:([^:@]+)@/, ':****@');
  console.log(`Connecting to database via: ${maskedUrl}`);
  // Determine dialect from URL (postgres:// or mysql://)
  const isPostgres = process.env.DATABASE_URL.startsWith('postgres');
  
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: isPostgres ? 'postgres' : 'mysql',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
} else {
  console.log('Connecting to local database...');
  // Fallback to individual env vars (local development)
  sequelize = new Sequelize(
    process.env.DB_NAME || 'grubpac_db',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || 'password',
    {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      dialect: process.env.DB_DIALECT || 'mysql',
      logging: false,
    }
  );
}

module.exports = sequelize;
