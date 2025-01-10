# Smartphone Store API Documentation

---

This documentation provides an overview of the available API endpoints for managing the Smartphone Store, integrating Gemini AI for chatbot assistance, and the SOLSTRA payment system.

## Table of Contents  
- [Introduction](#introduction)  
- [Endpoints](#endpoints)  
  - [User Management](#user-management)  
  - [Product Management](#product-management)  
  - [Chatbot Integration](#chatbot-integration)  
  - [Payment Integration](#payment-integration)  
- [Error Handling](#error-handling)  

---

## Introduction  
This API is designed to manage an e-commerce platform focused on smartphones. It allows user registration and login, CRUD operations for products, chatbot interaction via **Gemini AI**, and cryptocurrency payments using **SOLSTRA**.

---

## Endpoints

### User Management

#### 1. **Register User**  
**Endpoint:** `/register`  
**Method:** POST  
**Description:** Creates a new user account.  
**Request Body:**  
- `username` (string)  
- `email` (string)  
- `password` (string)  
**Success Response:**  
- `201` - User created successfully  
**Error Responses:**  
- `400` - Username or email already taken  
- `500` - Internal server error  

---

#### 2. **Login User**  
**Endpoint:** `/login`  
**Method:** POST  
**Description:** Authenticates a user and returns a JWT token.  
**Request Body:**  
- `username` (string)  
- `password` (string)  
**Success Response:**  
- `200` - Login successful  
**Error Responses:**  
- `401` - Invalid password  
- `404` - User not found  
- `500` - Internal server error  

---

### Product Management

#### 3. **Create Product**  
**Endpoint:** `/create`  
**Method:** POST (Protected - Admin only)  
**Description:** Adds a new product to the store.  
**Request Body:**  
- `name` (string)  
- `brand` (string)  
- `display` (string)  
- `chipset` (string)  
- `ram` (string)  
- `storage` (string)  
- `camera` (string)  
- `video` (string)  
- `battery` (string)  
- `OS` (string)  
- `price` (number)  
- `stock` (number)  
- `image` (string - optional)  
**Success Response:**  
- `201` - Product created  
**Error Responses:**  
- `400` - Product name must be unique  
- `500` - Internal server error  

---

#### 4. **Get All Products**  
**Endpoint:** `/`  
**Method:** GET  
**Description:** Retrieves all products in the store.  
**Success Response:**  
- `200` - List of products  

---

#### 5. **Get Single Product**  
**Endpoint:** `/:productName`  
**Method:** GET  
**Description:** Retrieves details of a single product by its name.  
**Success Response:**  
- `200` - Product details  
**Error Responses:**  
- `404` - Product not found  
- `500` - Internal server error  

---

#### 6. **Update Product**  
**Endpoint:** `/:productName`  
**Method:** PUT (Protected - Admin only)  
**Description:** Updates an existing product.  
**Request Body:**  
- `name` (string)  
- `brand` (string)  
- `display` (string)  
- `chipset` (string)  
- `ram` (string)  
- `storage` (string)  
- `camera` (string)  
- `video` (string)  
- `battery` (string)  
- `OS` (string)  
- `price` (number)  
- `stock` (number)  
- `image` (string - optional)  
**Success Response:**  
- `200` - Product updated  
**Error Responses:**  
- `404` - Product not found  
- `500` - Internal server error  

---

#### 7. **Delete Product**  
**Endpoint:** `/:productName`  
**Method:** DELETE (Protected - Admin only)  
**Description:** Deletes a product from the store.  
**Success Response:**  
- `200` - Product deleted  
**Error Responses:**  
- `404` - Product not found  
- `500` - Internal server error  

---

#### 8. **Get Products by Brand**  
**Endpoint:** `/brand/:brand`  
**Method:** GET  
**Description:** Retrieves products filtered by brand.  
**Success Response:**  
- `200` - List of products by brand  
**Error Responses:**  
- `404` - No products found for this brand  
- `500` - Internal server error  

---

### Chatbot Integration

#### 9. **Chat with AI**  
**Endpoint:** `/`  
**Method:** POST  
**Description:** Sends a user’s message to the Gemini AI chatbot for assistance.  
**Request Body:**  
- `message` (string)  
**Success Response:**  
- `200` - AI response returned  
**Error Responses:**  
- `500` - Internal server error  

---

### Payment Integration

#### 10. **Create Payment**  
**Endpoint:** `/create`  
**Method:** POST  
**Description:** Initiates a payment process through the SOLSTRA payment system.  
**Request Body:**  
- `productID` (number)  
- `currency` (string - SOL or USDT)  
- `webhookURL` (string - optional)  
**Success Response:**  
- `200` - Payment request created  
**Error Responses:**  
- `400` - Invalid currency or product not found  
- `500` - Internal server error  

---

#### 11. **Check Payment Status**  
**Endpoint:** `/check/:paymentID`  
**Method:** GET  
**Description:** Checks the status of a payment by its ID.  
**Success Response:**  
- `200` - Payment status retrieved  
**Error Responses:**  
- `404` - Payment record not found  
- `500` - Internal server error  

---

#### 12. **Payment History**  
**Endpoint:** `/history`  
**Method:** GET  
**Description:** Retrieves the payment history for the logged-in user.  
**Success Response:**  
- `200` - Payment history retrieved  
**Error Responses:**  
- `500` - Internal server error  

---

## Error Handling  
The API uses standard HTTP status codes to convey errors:
- `400` - Bad Request  
- `401` - Unauthorized  
- `404` - Not Found  
- `500` - Internal Server Error  

---