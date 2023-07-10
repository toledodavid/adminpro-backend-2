const {request: req, response: res} = require('express');
const Doctor = require('../models/doctor');

const getDoctors = async (request, response = res) => {

  try {

    const doctors = await Doctor.find()
                                .populate('user', 'name img')
                                .populate('hospital', 'name img');

    response.json({
      ok: true,
      doctors
    });

  } catch (error) {
    console.log(error);
    response.status(500).json({
      ok: false,
      message: 'Unexpected error, watch logs'
    });
  }
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

const updateDoctor = async (request = req, response = res) => {

  const userId = request.uid;
  const doctorId = request.params.id;

  try {

    const doctorDB = await Doctor.findById(doctorId);

    if (!doctorDB) {
      return response.status(404).json({
        ok: false,
        message: 'Doctor not found by id'
      });
    }

    const newDoctorInfo = {
      ...request.body,
      user: userId
    }

    const doctorUpdated = await Doctor.findByIdAndUpdate(doctorId, newDoctorInfo, {new: true});

    response.json({
      ok: true,
      doctor: doctorUpdated
    });

  } catch (error) {
    console.log(error);
    response.status(500).json({
      ok: false,
      message: 'Unexpected error, watch logs'
    });

  }

}

const deleteDoctor = async (request = req, response = res) => {

  const doctorId = request.params.id;

  try {

    const doctorDB = await Doctor.findById(doctorId);

    if (!doctorDB) {
      return response.status(404).json({
        ok: false,
        message: 'Doctor not found by id'
      });
    }

    await Doctor.findByIdAndDelete(doctorId);

    response.json({
      ok: true,
      message: 'Doctor deleted'
    });

  } catch (error) {
    response.status(500).json({
      ok: false,
      message: 'Unexpected error, watch logs'
    });
  }

}

const getDoctorById = async (request = req, response = res) => {
  const doctorId = request.params.id;

  try {

    const doctor = await Doctor.findById(doctorId)
                                .populate('user', 'name img')
                                .populate('hospital', 'name img');

    response.json({
      ok: true,
      doctor
    });

  } catch (error) {
    console.log(error);
    response.json({
      ok: false,
      message: 'Unexpected error, watch logs'
    });
  }

}



module.exports = {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctorById,
}