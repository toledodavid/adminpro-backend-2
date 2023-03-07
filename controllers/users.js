const User = require('../models/user');

const getUsers = (request, response) => {
  response.json({
    ok: true,
    msg: 'get users'
  });
}

const createUser = async(request, response) => {

  const {name, email, password} = request.body;

  const user = new User(request.body);

  await user.save();

  response.json({
    ok: true,
    user
  });
}


module.exports = {
  getUsers,
  createUser,
};