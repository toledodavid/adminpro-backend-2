const {request: req, response: res} = require('express');

const getAll = (request = req, response = res) => {
  response.json({
    ok: true,
    message: request.params.target
  });
}

module.exports = {
  getAll
}