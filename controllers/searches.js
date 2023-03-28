const {request: req, response: res} = require('express');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');
const User = require('../models/user');


const getAll = async (request = req, response = res) => {

  const target = request.params.target;
  const regex = new RegExp(target, 'i');


  const [users, doctors, hospitals] = await Promise.all([
    User.find({name: regex}),
    Doctor.find({name: regex}),
    Hospital.find({name: regex})
  ]);

  response.json({
    ok: true,
    users,
    doctors,
    hospitals
  });
}

const getDocumentsByCollection = async (request = req, response = res) => {
  const collection = request.params.collectionName;
  const target = request.params.target;

  const regex = new RegExp(target, 'i');

  let data = [];


  switch(collection) {
    case 'users':
      data = await User.find({name: regex});
      break;

    case 'doctors':
      data = await Doctor.find({name: regex}).populate('user', 'name img').populate('hospital', 'name img');
      break;

    case 'hospitals':
      data = await Hospital.find({name: regex}).populate('user', 'name img');
      break;

    default:
      return response.status(400).json({
        ok: false,
        message: 'Invalid collection, valid collections are (users, doctors, hospitals)'
      });
      break;
  }

  response.json({
    ok: true,
    result: data
  });
}

module.exports = {
  getAll,
  getDocumentsByCollection
}