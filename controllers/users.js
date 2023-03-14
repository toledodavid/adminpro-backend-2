const { response: res, request: req } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');




const getUsers = async(request, response) => {

  const users = await User.find({}, 'name email role google');

  response.json({
    ok: true,
    users
  });
}


const createUser = async(request, response = res) => {

  const {email, password} = request.body;

  try {

    const emailExists = await User.findOne({email});

    if (emailExists) {
      return response.status(400).json({
        ok: false,
        message: 'Email already exists'
      });
    }

    const user = new User(request.body);

    // Encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // Save user
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


const updateUser = async(request, response = res) => {

  // TODO: Validate token and verify if user is correct

  const uid = request.params.id;

  try {

    const userDB = await User.findById(uid);

    if(!userDB) {
      return response.status(404).json({
        ok: false,
        message: 'User does not exist by id'
      });
    }

    const {password, google, email, ...fields} = request.body;

    if (userDB.email !== email) {
      const emailExists = await User.findOne({email});
      if (emailExists) {
        return response.status(400).json({
          ok: false,
          message: 'User already exists with that email'
        });
      }
    }

    fields.email = email;

    const userUpdated = await User.findByIdAndUpdate(uid, fields, {new: true});

    response.json({
      ok: true,
      user: userUpdated
    });

  } catch (error) {
    console.log(error);
    response.status(500).json({
      ok: false,
      message: 'Unexpected error'
    });
  }
}


const deleteUser  = async(request = req, response = res) => {

  const uid = request.params.id;

  try {

    const userDB = await User.findById(uid);

    if(!userDB) {
      return response.status(404).json({
        ok: false,
        message: 'User does not exist by id'
      });
    }

    await User.findByIdAndDelete(uid);

    response.json({
      ok: true,
      message: 'User deleted'
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
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};