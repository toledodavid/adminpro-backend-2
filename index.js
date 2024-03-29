require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');


// Create express server
const app = express();

// Set CORS
app.use(cors());

// Public folder
app.use(express.static('public'));

// Read and parsing body
app.use(express.json());

dbConnection();

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/hospitals', require('./routes/hospitals'));
app.use('/api/doctors', require('./routes/doctors'));
app.use('/api/all', require('./routes/searches'));
app.use('/api/upload', require('./routes/uploads'));
app.use('/api/login', require('./routes/auth'));


app.listen(process.env.PORT, () => {
  console.log('Server running successfully', process.env.PORT);
});


