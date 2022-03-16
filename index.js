const express = require('express');
const app = express();
var bodyParser = require('body-parser');

const connect = require('./config/db');

require('dotenv').config();

const PORT = process.env.PORT || 8000;

// connect to MongoDB userDatabase
connect();

// bodyParser Middleware
app.use(bodyParser.json());

app.get('/',(req, res) => {
    res.send('Hello World');
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})