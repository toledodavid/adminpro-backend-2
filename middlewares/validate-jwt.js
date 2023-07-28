const { response: res } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


const validateJWT = (request, response = res, next) => {

  // Read token
  const token = request.header('x-token');

  if (!token) {
    return response.status(401).json({
      ok: false,
      message: 'Any token in the request'
    });
  }

  try {

    const {uid} = jwt.verify(token, process.env.JWT_SECRET);

    request.uid = uid;

    next();

  } catch (error) {
    return response.status(401).json({
      ok: false,
      message: 'Invalid token'
    });
  }

}

const validateADMIN_ROLE = async (request, response = res, next) => {

  const uid = request.uid;

  try {

    const userDB = await User.findById(uid);

    if (!userDB) {
      return response.status(404).json({
        ok: false,
        message: 'User does not exist'
      });
    }

    if (userDB.role !== 'ADMIN_ROLE') {
      return response.status(403).json({
        ok: false,
        message: 'Unauthorized task'
      });
    }

    next();

  } catch (error) {
    console.log(error);
    response.status(500).json({
      ok: false,
      message: 'Unexpected error'
    });
  }
}



module.exports = {
  validateJWT,
  validateADMIN_ROLE
};