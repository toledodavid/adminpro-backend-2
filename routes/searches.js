/*
  Route: /api/all
*/

const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getAll, getDocumentsByCollection } = require('../controllers/searches');


const router = Router();

router.get('/:target', validateJWT, getAll);
router.get('/collection/:collectionName/:target', validateJWT, getDocumentsByCollection);


module.exports = router;