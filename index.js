require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const serverless = require("serverless-http");
const productRoute = require("../routes/product.route.js");
const app = express();
const cors = require("cors");

// Middleware
app.use(cors({
  origin: ["https://ekart-client.vercel.app"],
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/.netlify/functions/api", productRoute);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Connection failed:", err.message);
  });

module.exports.handler = serverless(app);
