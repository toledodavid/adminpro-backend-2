/*
  Route: /api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { login } = require('../controllers/auth');


const router = Router();


router.post('/',[
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').notEmpty(),
  validateFields
], login);



module.exports = router;