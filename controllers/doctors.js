const {response: res} = require('express');

const getDoctors = (request, response = res) => {
  response.json({
    ok: true,
    message: 'getDoctors'
  });
}

const createDoctor = (request, response = res) => {
  response.json({
    ok: true,
    message: 'createDoctor'
  });
}

const updateDoctor = (request, response = res) => {
  response.json({
    ok: true,
    message: 'updateDoctor'
  });
}

const deleteDoctor = (request, response = res) => {
  response.json({
    ok: true,
    message: 'deleteDoctor'
  });
}



module.exports = {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
}