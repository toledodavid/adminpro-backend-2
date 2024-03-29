const { response: res, request: req } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const { getMenuFrontEnd } = require('../helpers/menu-frontend');


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
    const token = await generateJWT(userDB.id);


    response.json({
      ok: true,
      token,
      menu: getMenuFrontEnd(userDB.role)
    });

  } catch (error) {
    console.log(error);
    response.status(500).json({
      ok: false,
      message: 'Unexpected error'
    });
  }

}


const googleSignIn = async(request = req, response = res) => {

  try {
    const {email, name, picture} = await googleVerify(request.body.token);

    const userDB = await User.findOne({email});
    let user;

    if (!userDB) {
      user = new User({name, email, password: '@@@', img: picture, google: true});
    } else {
      user = userDB;
      user.google = true;
    }

    await user.save();

    // Generate token - JWT
    const token = await generateJWT(user.id);

    response.json({
      ok: true,
      email,
      name,
      picture,
      token,
      menu: getMenuFrontEnd(user.role)
    });

  } catch (error) {
    console.log(error);
    response.status(400).json({
      ok: false,
      message: 'Google token is invalid'
    });
  }
}

const renewToken = async (request = req, response = res) => {
  const uid = request.uid;

  // Generate token - JWT
  const token = await generateJWT(uid);

  const user = await User.findById(uid);

  response.json({
    ok: true,
    token,
    user,
    menu: getMenuFrontEnd(user.role)
  });

}





module.exports = {
  login,
  googleSignIn,
  renewToken
};