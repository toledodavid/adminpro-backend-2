const { response: res } = require('express');
const jwt = require('jsonwebtoken');


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



module.exports = {
  validateJWT
};