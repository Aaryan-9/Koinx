# KoinX Backend Internship Assignment

## Overview

This project is a Node.js application built using NestJS and MongoDB to fetch and manage cryptocurrency data for Bitcoin, Matic, and Ethereum. The application implements background jobs to retrieve cryptocurrency information and provides APIs to access the latest data and standard deviation of prices.

## Live Demo

You can access the live application here: [KoinX Backend](https://koinx-6p4d.onrender.com/)

### API Endpoints

1. **Fetch Stats**
   - **Endpoint:** `/api/stats`
   - **Method:** `GET`
   - **Query Params:**
     - `coin`: The cryptocurrency for which to calculate the price deviation (e.g., `bitcoin`, `matic-network`, `ethereum`, Mentioned in the `CoinTypeEnum`).
   - **Sample Request:**
     ```
     GET /api/stats?coin=bitcoin
     ```
   - **Sample Response:**
   ```json
   {
       price: 40000,
	     marketCap: 800000000,
	     "24hChange": 3.4
   }

2. **Fetch Price Deviation**
   - **Endpoint:** `/api/deviation`
   - **Method:** `GET`
   - **Query Params:**
     - `coin`: The cryptocurrency for which to calculate the price deviation (e.g., `bitcoin`, `matic-network`, `ethereum`, Mentioned in the `CoinTypeEnum`).
   - **Sample Request:**
     ```
     GET /api/deviation?coin=bitcoin
     ```
   - **Sample Response:**
   ```json
   {
       "deviation": 4082.48
   }

### Background jobs

The application runs a background job every 2 hours to fetch the current price, market cap, and 24-hour change for the specified cryptocurrencies using the CoinGecko API.

### Technologies Used

 - Node.js 
 - NestJS
 - MongoDB
 - CoinGecko API

### Installation

To run this project locally, follow these steps:

- Clone the repository:
  - `git clone https://github.com/Aaryan-9/Koinx.git`
    
- Navigate to the project directory:
  - `cd Koinx`

- Install the dependencies:
 - `yarn install`

- Set up your MongoDB connection string in an `.env` file:
 - `MONGO_URI = <your-mongodb-connection-string>`

- Start the application:
  - `yarn start:dev`


### Optional Tasks
  - The database is hosted on MongoDB Atlas for remote access.
  - The backend is deployed on Render for public accessibility.

### Best Practices
This project follows best practices in code organization, API design, and database schema design. Commits are structured and named appropriately to reflect the changes made.

### Conclusion
This assignment demonstrates my ability to implement a server-side application using Node.js and MongoDB while following production-grade practices. I look forward to contributing further as an intern at KoinX.
