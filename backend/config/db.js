const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432, // Gunakan default port PostgreSQL jika tidak ada di environment
    dialect: 'postgres',
    logging: false, // Nonaktifkan logging query SQL jika tidak diperlukan
    dialectOptions: {
        connectTimeout: 30000, // Timeout koneksi 30 detik
    },
});

module.exports = sequelize;
