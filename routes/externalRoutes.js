// const express = require('express');
// const router = express.Router();
// const externalController = require('../controllers/externalController');
// const verifyToken = require('../middlewares/jwtAuth'); // JWT 

// router.get('/external-data', verifyToken, externalController.getExternalData);

// module.exports = router;


const express = require('express');
const router = express.Router();
const externalController = require('../controllers/externalController');
const verifyToken = require('../middlewares/jwtAuth'); // JWT 

// دریافت داده‌های خارجی (فقط کاربران لاگین شده)
router.get('/external-data', verifyToken, externalController.getExternalData);

module.exports = router;