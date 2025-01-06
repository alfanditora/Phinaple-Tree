const express = require('express');
const sequelize = require('./config/db');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const chatbotRoutes = require('./routes/chatbot');
const authenticate = require('./middleware/auth');
const userRateLimiter = require('./middleware/limiter');
const chatbotRateLimiter = require('./middleware/chatbotLimiter');
const cors = require('cors');

const app = express();

app.use(cors())
app.use(express.json());

// Auth Routes (No Authentication Needed)
app.use('/api/auth', authRoutes);

// Product Routes (Protected)
app.use('/api/products', authenticate, userRateLimiter, productRoutes);

// Chatbot Routes (Protected)
app.use('/api/chatbot', authenticate, chatbotRateLimiter, chatbotRoutes);

// Start server and connect to the database
const startServer = async () => {
    try {
        await sequelize.sync(); // Sync models with DB
        console.log('Database connected!');
        app.listen(5000, () => console.log('Server running on port 5000'));
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();
