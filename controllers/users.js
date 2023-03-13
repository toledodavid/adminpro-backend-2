const { response: res } = require('express');
const { validationResult } = require('express-validator');
const User = require('../models/user');

const getUsers = async(request, response) => {

  const users = await User.find({}, 'name email role google');

  response.json({
    ok: true,
    users
  });
}

const createUser = async(request, response = res) => {

  const {name, email, password} = request.body;

  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(400).json({
      ok: false,
      errors: errors.mapped()
    });
  }

  try {

    const emailExists = await User.findOne({email});

    if (emailExists) {
      return response.status(400).json({
        ok: false,
        message: 'Email already exists'
      });
    }

    const user = new User(request.body);

    await user.save();

    response.json({
      ok: true,
      user
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
  getUsers,
  createUser,
};