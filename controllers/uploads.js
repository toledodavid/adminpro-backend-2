const pathNode = require('path');
const fs = require('fs');
const {request: req, response: res} = require('express');
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require('../helpers/update-image');



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
  const file = request.files.image;

  const cuttedName = file.name.split('.');
  const fileExtention = cuttedName[cuttedName.length - 1];

  const validExtentions = ['png', 'jpg', 'jpeg', 'gif'];

  if (!validExtentions.includes(fileExtention)) {
    return response.status(400).json({
      ok: false,
      message: 'Invalid file extention.'
    });
  }

  // Generate file name
  const fileName = `${uuidv4()}.${fileExtention}`;

  // Path to save file
  const path = `./uploads/${collection}/${fileName}`;

  // Use the mv() method to place the file somewhere on your server
  file.mv(path, (err) => {
    if (err) {
      console.log(err);
      return response.status(500).json({
        ok: false,
        message: 'Error trying to move image'
      });
    }

    // Update DataBase
    updateImage(collection, id, fileName);

    response.json({
      ok: true,
      message: 'File uploaded',
      fileName
    });
  });

}


const returnImage = (request = req, response = res) => {
  const {collection, image} = request.params;

  let pathImg = pathNode.join(__dirname, `../uploads/${collection}/${image}`);

  if (fs.existsSync(pathImg)) {
    response.sendFile(pathImg);
  } else {
    pathImg = pathNode.join(__dirname, '../uploads/no-img.jpg');
    response.sendFile(pathImg);
  }


}


module.exports = {
  uploadFile,
  returnImage
}