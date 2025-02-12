const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    display: {
        type: DataTypes.STRING, 
        allowNull: true,
    },
    chipset: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ram: {
        type: DataTypes.STRING, // RAM misalnya "8GB", "16GB", dll
        allowNull: true,
    },
    storage: {
        type: DataTypes.STRING, // Penyimpanan misalnya "128GB", "256GB", dll
        allowNull: true,
    },
    camera: {
        type: DataTypes.STRING, // Misalnya "12 MP"
        allowNull: true,
    },
    video: {
        type: DataTypes.STRING, // Misalnya "4K", "1080p", dll
        allowNull: true,
    },
    battery: {
        type: DataTypes.STRING, // Misalnya "4000mAh", "5000mAh", dll
        allowNull: true,
    },
    OS: {
        type: DataTypes.STRING, // Misalnya "Android", "iOS", dll
        allowNull: true,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    image: {
        type: DataTypes.STRING, // Misal 'product/file.webp
        allowNull: false,
    },
}, {
    tableName: 'products',
    timestamps: true, 
});

module.exports = Product;
