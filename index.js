require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const serverless = require('serverless-http');
const productRoute = require('./routes/product.route.js');
const app = express();
const cors = require('cors');

// Middleware
app.use(cors({
  origin: ['https://ekart-client.vercel.app'],
  methods: ['POST', 'GET', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', productRoute);

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch((err) => {
    console.error('Connection failed:', err.message);
  });

module.exports.handler = serverless(app);
