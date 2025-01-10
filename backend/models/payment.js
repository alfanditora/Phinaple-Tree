const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Payment = sequelize.define('Payment', {
    payment_id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    user_id: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id'
        }
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false
    },
    original_price: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(20, 8),
        allowNull: false
    },
    wallet_address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    check_paid_url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_paid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    is_expired: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'payments',
    timestamps: true,
});

Payment.associate = (models) => {
    Payment.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
    });
    Payment.belongsTo(models.Product, {
        foreignKey: 'product_id',
        as: 'product'
    });
};

module.exports = Payment;
