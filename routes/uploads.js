/*
  Route: /api/upload
*/

const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { validateJWT } = require('../middlewares/validate-jwt');
const { uploadFile } = require('../controllers/uploads');


const router = Router();

// default options
router.use(expressFileUpload());

router.put('/:collection/:id', validateJWT, uploadFile);

module.exports = router;