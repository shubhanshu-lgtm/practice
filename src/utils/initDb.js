const mysql = require('mysql2/promise');
require('dotenv').config();

const initDb = async () => {
  // If we're using a DATABASE_URL (like Supabase/Render), 
  // the database is already created by the provider.
  if (process.env.DATABASE_URL) {
    return;
  }

  try {
    const mysql = require('mysql2/promise');
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'grubpac_db'}\`;`);
    await connection.end();
    console.log(`Database '${process.env.DB_NAME || 'grubpac_db'}' ensured.`);
  } catch (error) {
    console.error('Error ensuring database exists:', error.message);
  }
};

module.exports = initDb;
