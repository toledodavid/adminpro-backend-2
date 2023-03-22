const {response: res} = require('express');
const Doctor = require('../models/doctor');

const getDoctors = (request, response = res) => {
  response.json({
    ok: true,
    message: 'getDoctors'
  });
}

const createDoctor = async (request, response = res) => {

  const uid = request.uid;

  const doctor = new Doctor({
    ...request.body,
    user: uid
  });

  try {

    const doctorDB = await doctor.save();

    response.json({
      ok: true,
      doctor: doctorDB
    });

  } catch (error) {
    console.log(error);
    response.status(500).json({
      ok: false,
      message: 'Unexpected error, watch logs'
    });
  }
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