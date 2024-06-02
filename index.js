require("dotenv").config(); 

const express = require("express");
const mongoose = require("mongoose");
const productRoute = require("./routes/product.route.js");
const app = express();
const cors = require('cors'); 



// Middleware
<<<<<<< HEAD

app.use(cors());
=======
app.use(cors(
  {
    origin :[ "https://ekart-client.vercel.app"], 
    methods:[ "POST", "GET", "PUT", "DELETE" ], 
    credentials: true 
  }
  ));
>>>>>>> 67cc22ab2d1933ad9fc54f95788f360776aae257

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/", productRoute);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Connection failed:", err.message);
  });
