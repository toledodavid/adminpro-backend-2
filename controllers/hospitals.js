const {request: req, response: res} = require('express');
const Hospital = require('../models/hospital');

const getHospitals = async (request, response = res) => {

  try {

    const hospitals = await Hospital.find()
                                    .populate('user', 'name img');

    response.json({
      ok: true,
      hospitals
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      ok: false,
      message: 'Unexpected error, watch logs'
    });
  }

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

const updateHospital = async (request = req, response = res) => {

  const hospitalId = request.params.id;
  const userId = request.uid;

  try {

    const hospitalDB = await Hospital.findById(hospitalId);

    if (!hospitalDB) {
      return response.status(404).json({
        ok: false,
        message: 'Hospital not found by id'
      });
    }

    const newHospitalInfo = {
      ...request.body,
      user: userId
    }

    const hospitalUpdated = await Hospital.findByIdAndUpdate(hospitalId, newHospitalInfo, {new: true});

    response.json({
      ok: true,
      hospital: hospitalUpdated
    });

  } catch (error) {
    console.log(error);
    response.status(500).json({
      ok: false,
      message: 'Unexpected error, watch logs'
    });
  }

}

const deleteHospital = async (request = req, response = res) => {

  const hospitalId = request.params.id;

  try {

    const hospitalDB = await Hospital.findById(hospitalId);

    if (!hospitalDB) {
      return response.status(404).json({
        ok: false,
        message: 'Hospital not found by id'
      });
    }

    await Hospital.findByIdAndDelete(hospitalId);

    response.json({
      ok: true,
      message: 'Hospital deleted'
    });

  } catch (error) {
    console.log(error);
    response.status(500).json({
      ok: false,
      message: 'Unexpected error, watch logs'
    });
  }

}

module.exports = {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital
}