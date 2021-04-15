const router = require('express').Router();

// Import controllers
const adminMainController = require('../controllers/adminMainController');
const adminPhonesController = require('../controllers/adminPhonesController');

// admin main route
router.get('/', adminMainController.main);

// admin phones routes
router.get('/phones', adminPhonesController.phones);
router.get('/phones/add', adminPhonesController.phonesAddGet);
router.post('/phones/add', adminPhonesController.phonesAddPost);

module.exports = router;