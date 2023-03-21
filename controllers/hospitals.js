const {response: res} = require('express');

const getHospitals = (request, response = res) => {
  response.json({
    ok: true,
    message: 'getHospitals'
  });
}

const createHospital = (request, response = res) => {
  response.json({
    ok: true,
    message: 'createHospital'
  });
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