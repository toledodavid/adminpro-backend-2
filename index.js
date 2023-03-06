const express = require('express');
const { dbConnection } = require('./database/config');


// Create express server
const app = express();

dbConnection();

// Routes
app.get('/', (req, resp) => {
  resp.json({
    ok: true,
    msg: 'Hello world'
  });
});


app.listen(3003, () => {
  console.log('Server running successfully', 3003);
});


