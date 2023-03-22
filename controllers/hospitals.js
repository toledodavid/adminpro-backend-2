const {response: res} = require('express');
const Hospital = require('../models/hospital');

const getHospitals = (request, response = res) => {
  response.json({
    ok: true,
    message: 'getHospitals'
  });
}

const createHospital = async (request, response = res) => {

  const uid = request.uid;
  const hospital = new Hospital({
    ...request.body,
    user: uid
  });


  try {

    const hospitalDB = await hospital.save();

    response.json({
      ok: true,
      hospital: hospitalDB
    });

  } catch (error) {
    console.log(error);
    response.status(500).json({
      ok: false,
      message: 'Unexpected error, watch logs'
    });
  }
}

const updateHospital = (request, response = res) => {
  response.json({
    ok: true,
    message: 'updateHospital'
  });
}

const deleteHospital = (request, response = res) => {
  response.json({
    ok: true,
    message: 'deleteHospital'
  });
}

module.exports = {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital
}