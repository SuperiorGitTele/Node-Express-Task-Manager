require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require('cors');

const app = express();

// Middleware

app.use(express.json());

// API Route
app.use('/api/auth', require('./routes/authRoute'));

app.use(cors())

// Connect to the database
connectDB();

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

