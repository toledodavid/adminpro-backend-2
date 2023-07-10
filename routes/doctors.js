/*
  Route: /api/doctors
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getDoctors, createDoctor, updateDoctor, deleteDoctor, getDoctorById } = require('../controllers/doctors');

const router = Router();


router.get('/', validateJWT, getDoctors);

router.post('/',[
  validateJWT,
  check('name', 'Doctor name is required').notEmpty(),
  check('hospital', 'Hospital id must be valid').isMongoId(),
  validateFields
], createDoctor);

router.put('/:id',[
  validateJWT,
  check('name', 'Doctor name is required').notEmpty(),
  check('hospital', 'Hospital id must be valid').isMongoId(),
  validateFields
], updateDoctor);

router.delete('/:id', validateJWT, deleteDoctor);

router.get('/:id', validateJWT, getDoctorById);



module.exports = router;