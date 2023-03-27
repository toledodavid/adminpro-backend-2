const {request: req, response: res} = require('express');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');
const User = require('../models/user');


const getAll = async (request = req, response = res) => {

  const target = request.params.target;
  const regex = RegExp(target, 'i');


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

module.exports = {
  getAll
}