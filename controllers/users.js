

const getUsers = (request, response) => {
  response.json({
    ok: true,
    msg: 'Hello world'
  });
}


module.exports = {
  getUsers,
};