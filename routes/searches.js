/*
  Route: /api/all
*/

const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getAll } = require('../controllers/searches');


const router = Router();

router.get('/:target', validateJWT, getAll);


module.exports = router;