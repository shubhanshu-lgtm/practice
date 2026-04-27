const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const { sequelize } = require('./models');
const initDb = require('./utils/initDb');
const authRoutes = require('./routes/authRoutes');
const contentRoutes = require('./routes/contentRoutes');
const broadcastRoutes = require('./routes/broadcastRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

const app = express();

// Middlewares
app.use(helmet({
  crossOriginResourcePolicy: false, // Allow viewing uploaded images
}));
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // each IP to 100 requests per windowMs (15 minutes)
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

// Apply rate limiting to all requests
app.use(limiter);

// Static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/content', broadcastRoutes); // Public broadcasting endpoint: /content/live/:teacherId

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

const ResponseHandler = require('./utils/responseHandler');

// Error handling middleware
app.use((err, req, res, next) => {
  return ResponseHandler.sendErrorResponse(res, err);
});

const PORT = process.env.PORT || 8080;

// Sync database and start server
const startServer = async () => {
  try {
    // Ensure database exists before connecting
    await initDb();
    
    await sequelize.authenticate();
    console.log('Database connected...');
    
    // In development, alter: true may ER_LOCK_DEADLOCK 
    // if nodemon triggers multiple restarts simultaneously.
    // We'll only run sync({ alter: true }) if the DB_ALTER env var is explicitly set to true.
    // Otherwise, we'll just use a regular sync() which is much safer.
    const shouldAlter = process.env.DB_ALTER === 'true';
    
    try {
      if (shouldAlter) {
        console.log('Database sync with alter: true starting...');
        await sequelize.sync({ alter: true });
        console.log('Database synced with alter: true.');
      } else {
        await sequelize.sync();
        console.log('Database synced successfully.');
      }
    } catch (syncError) {
      if (syncError.parent && syncError.parent.code === 'ER_LOCK_DEADLOCK') {
        console.warn('Database deadlock detected during sync. This usually happens when multiple server instances try to alter the same table. Retrying in 2s...');
        await new Promise(resolve => setTimeout(resolve, 2000));
        await sequelize.sync(); // Retry without alter for safety
        console.log('Database synced after retry (without alter).');
      } else {
        throw syncError;
      }
    }

    app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();

module.exports = app;
