const express = require('express');


// Create express server
const app = express();

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


