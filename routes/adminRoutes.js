const router = require('express').Router();

// Import controllers
const adminControllers = require('../controllers/adminControllers');

router.get('/', adminControllers.main);

router.get('/phones', adminControllers.phones);

module.exports = router;