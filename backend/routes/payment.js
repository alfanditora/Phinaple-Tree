const express = require('express');
const axios = require('axios');
const Product = require('../models/product');
const Payment = require('../models/payment');
require('dotenv').config();

const router = express.Router();

// API Configuration
const API_BASE_URL = 'https://api-staging.solstra.fi/service/pay';
const API_KEY = process.env.SOLSTRA_API_KEY;

// Axios instance with API Key header
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'X-Api-Key': API_KEY,
        'Content-Type': 'application/json',
    },
});

const exchangeRates = {
    SOL: 186,
    USDT: 1
};

const convertCurrency = (amount, toCurrency) => {
    try {
        const rate = exchangeRates[toCurrency];
        if (!rate) {
            throw new Error('Unsupported currency');
        }

        // Convert USD to the target currency
        const convertedAmount = amount / rate;

        // Format based on currency
        if (toCurrency === 'SOL') {
            return parseFloat(convertedAmount.toFixed(9));
        } else { // USDT
            return parseFloat(convertedAmount.toFixed(6));
        }
    } catch (error) {
        console.error('Conversion error details:', error.message);
        throw new Error(`Failed to convert currency: ${error.message}`);
    }
};

// Create Payment Route
router.post('/create', async (req, res) => {
    const { productID, currency, webhookURL } = req.body;
    const userId = req.user.id;

    try {
        // Validate product
        const product = await Product.findByPk(productID);
        if (!product) {
            return res.status(404).json({ 
                status: 'error',
                message: 'Product not found' 
            });
        }

        // Validate currency
        const validCurrencies = ['SOL', 'USDT'];
        if (!currency || !validCurrencies.includes(currency)) {
            return res.status(400).json({ 
                status: 'error',
                message: 'Invalid currency. Allowed values are SOL or USDT' 
            });
        }

        // Convert USD price to selected crypto
        let convertedAmount;
        try {
            // Assume product price is in USD
            convertedAmount = await convertCurrency(product.price, currency);
            console.log(`Converted ${product.price} USD to ${convertedAmount} ${currency}`);
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: 'Currency conversion failed',
                error: error.message
            });
        }

        // Create payment request payload
        const payloadData = {
            currency,
            amount: convertedAmount,
            ...(webhookURL && { webhookURL })
        };

        console.log('Payment request payload:', payloadData);

        // Make API request
        const response = await apiClient.post('/create', payloadData);
        const { data } = response.data;

        // Create payment record in database
        const paymentData = {
            payment_id: data.id,
            user_id: userId,
            product_id: productID,
            currency: data.currency,
            original_price: product.price,
            amount: data.amount,
            wallet_address: data.walletAddress,
            check_paid_url: data.checkPaid,
            is_paid: false,
            is_expired: false,
        };

        const payment = await Payment.create(paymentData);

        return res.status(200).json(response.data);
    } catch (error) {
        console.error('Error creating payment:', error.response?.data || error.message);
        return res.status(500).json({
            status: 'error',
            message: 'Failed to create payment',
            error: error.response?.data || error.message
        });
    }
});

router.get('/check/:paymentID', async (req, res) => {
    const { paymentID } = req.params;

    if (!paymentID) {
        return res.status(400).json({
            status: 'error',
            message: 'Payment ID is required'
        });
    }

    try {
        // Fetch payment status from external API
        const response = await apiClient.post(`/${paymentID}/check`);
        const apiData = response.data.data; // Access the data property of the response

        // Find the payment record
        const payment = await Payment.findOne({
            where: { payment_id: paymentID },
        });

        if (!payment) {
            return res.status(404).json({
                status: 'error',
                message: 'Payment record not found',
            });
        }

        // Update payment with API response data
        const updateData = {
            is_paid: apiData.isPaid,
            is_expired: apiData.isExpired,
            amount: apiData.amount,
            wallet_address: apiData.walletAddress,
            check_paid_url: apiData.checkPaid
        };

        await payment.update(updateData);
        await payment.reload();

        return res.status(200).json(response.data);
    } catch (error) {
        console.error('Error checking payment:', error.response?.data || error.message);
        return res.status(500).json({
            status: 'error',
            message: 'Failed to check payment',
            details: error.response?.data || error.message,
        });
    }
});

// Payment History Route
router.get('/history', async (req, res) => {
    const userId = req.user.id;

    try {
        const paymentHistory = await Payment.findAll({
            where: { user_id: userId },
            order: [['createdAt', 'DESC']],
        });

        if (!paymentHistory.length) {
            return res.status(404).json({
                status: 'error',
                message: 'No payment history found',
            });
        }

        const formattedHistory = paymentHistory.map(payment => ({
            paymentID: payment.payment_id,
            userID: payment.user_id,
            productID: payment.product_id,
            productName: payment.product?.name,
            currency: payment.currency,
            originalPrice: payment.original_price,
            amount: payment.amount,
            isPaid: payment.is_paid,
            isExpired: payment.is_expired,
            walletAddress: payment.wallet_address,
            checkPaidURL: payment.check_paid_url,
            createdAt: payment.createdAt,
            updatedAt: payment.updatedAt,
        }));

        return res.status(200).json({
            status: 'success',
            data: formattedHistory,
        });
    } catch (error) {
        console.error('Error fetching payment history:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Failed to fetch payment history',
            details: error.message,
        });
    }
});




module.exports = router;
