require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');


// Create express server
const app = express();

// Set CORS
app.use(cors());

// Read and parsing body
app.use(express.json());

dbConnection();

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/login', require('./routes/auth'));


app.listen(process.env.PORT, () => {
  console.log('Server running successfully', process.env.PORT);
});


