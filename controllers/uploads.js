const {request: req, response: res} = require('express');

const uploadFile = (request = req, response = res) => {

  const {collection, id} = request.params;

  const validCollections = ['users', 'doctors', 'hospitals'];

  if (!validCollections.includes(collection)) {
    return response.status(400).json({
      ok: false,
      message: 'Invalid collection, please use a valid one (users, doctors, hospitals)'
    });
  }

  // Validate that file exists
  if (!request.files || Object.keys(request.files).length === 0) {
    return response.status(400).json({
      ok: false,
      message: 'No files were uploaded.'
    });
  }

  // Process the image

  response.json({
    ok: true,
    message: 'upload file',
    collection,
    id
  });
}


module.exports = {
  uploadFile
}