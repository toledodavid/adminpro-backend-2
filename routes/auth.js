/*
  Route: /api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { login, googleSignIn, renewToken } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/validate-jwt');


const router = Router();


router.post('/',[
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').notEmpty(),
  validateFields
], login);

router.post('/google', [
  check('token', 'Google token is required').notEmpty(),
  validateFields
], googleSignIn);

router.get('/renew', validateJWT, renewToken);

module.exports = router;