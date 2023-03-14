const { response: res, request: req } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');


const login = async(request = req, response = res) => {

  const {email, password} = request.body;

  try {


    // Verify email
    const userDB = await User.findOne({email});

    if(!userDB) {
      return response.status(404).json({
        ok: false,
        message: 'Email not found'
      });
    }

    // Verify password
    const validPassword = bcrypt.compareSync(password, userDB.password);
    if(!validPassword) {
      return response.status(400).json({
        ok: false,
        message: 'Invalid password'
      });
    }

    // Generate token - JWT


    response.json({
      ok: true,
      message: 'Hello world'
    });

  } catch (error) {
    console.log(error);
    response.status(500).json({
      ok: false,
      message: 'Unexpected error'
    });
  }

}





module.exports = {
  login,
};