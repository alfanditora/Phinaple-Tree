const express = require('express');
const sequelize = require('./config/db');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const authenticate = require('./middleware/auth');

const app = express();

app.use(express.json());

// Auth Routes
app.use('/api/auth', authRoutes);

// Product Routes (Protected)
app.use('/api/products', authenticate, productRoutes);

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
