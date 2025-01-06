const express = require('express');
const Product = require('../models/product');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const router = express.Router();

require('dotenv').config();

// Konfigurasi Gemini API
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-pro', // Model Gemini yang digunakan
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: 'text/plain',
};

router.post('/', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        // Query products from database
        const products = await Product.findAll();
        const productDescriptions = products.map(product => {
            return `${product.name} by ${product.brand} with ${product.display} display, ${product.chipset} chipset, ${product.ram} RAM, ${product.storage} storage, priced at $${product.price}.`;
        }).join('\n');

        // Construct prompt with product descriptions
        const prompt = `
You are a helpful assistant for a smartphone store. Here is the list of available products:

${productDescriptions}

The customer is asking the following question: "${message}"

Please provide a helpful answer based on the available products and general knowledge about smartphones.
        `;

        // Start chat session with Gemini API
        const chatSession = model.startChat({
            generationConfig,
            history: [], // Chat history (optional)
        });

        // Send message to Gemini API
        const result = await chatSession.sendMessage(prompt);

        // Extract and return the response
        const chatbotResponse = result.response.text();
        return res.status(200).json({ response: chatbotResponse });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error generating response from chatbot' });
    }
});

module.exports = router;
