/*
  Route: /api/users
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users');
const { validateJWT, validateADMIN_ROLE } = require('../middlewares/validate-jwt');

const router = Router();


router.get('/', validateJWT, getUsers);

router.post('/',[
  check('name', 'Name is required').notEmpty(),
  check('password', 'Password is required').notEmpty(),
  check('email', 'Email is required').isEmail(),
  validateFields
], createUser);

router.put('/:id',[
  validateJWT,
  validateADMIN_ROLE,
  check('name', 'Name is required').notEmpty(),
  check('email', 'Email is required').isEmail(),
  check('role', 'Role is required').notEmpty(),
  validateFields
], updateUser);

router.delete('/:id', [validateJWT, validateADMIN_ROLE], deleteUser);



module.exports = router;