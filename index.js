const express = require('express');
const app = express();
var bodyParser = require('body-parser');

// importing MongoDB connect function
const connect = require('./config/db');

// importing user registration routes
const userRegistrationRoute = require("./routes/userRoutes");

require('dotenv').config();

const PORT = process.env.PORT || 8000;

// connect to MongoDB userDatabase
connect();

// bodyParser Middleware
app.use(bodyParser.json());

// user registration route
app.use('/', userRegistrationRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})