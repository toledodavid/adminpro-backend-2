require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');


// Create express server
const app = express();

// Set CORS
app.use(cors());

dbConnection();

// Routes
app.get('/', (req, resp) => {
  resp.json({
    ok: true,
    msg: 'Hello world'
  });
});


app.listen(process.env.PORT, () => {
  console.log('Server running successfully', process.env.PORT);
});


