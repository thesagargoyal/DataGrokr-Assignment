const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const cors = require('cors');

// importing MongoDB connect function
const connect = require('./config/db');

// importing user registration routes
const userRegistrationRoute = require("./routes/userRoutes");

require('dotenv').config();

const PORT = process.env.PORT || 8000;

// connect to MongoDB userDatabase
connect();

// CORS used for transferring data from frontend to backend
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            
    //access-control-allow-credentials:true
    optionSuccessStatus:200
}

// CORS Middleware
app.use(cors(corsOptions));

// bodyParser Middleware
app.use(bodyParser.json());

// user registration route
app.use('/', userRegistrationRoute);

// Port listening
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})