/*
  Route: /api/users
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users');

const router = Router();


router.get('/', getUsers);

router.post('/',[
  check('name', 'Name is required').notEmpty(),
  check('password', 'Password is required').notEmpty(),
  check('email', 'Email is required').isEmail(),
  validateFields
], createUser);

router.put('/:id',[
  check('name', 'Name is required').notEmpty(),
  check('email', 'Email is required').isEmail(),
  check('role', 'Role is required').notEmpty(),
  validateFields
], updateUser);

router.delete('/:id', deleteUser);



module.exports = router;