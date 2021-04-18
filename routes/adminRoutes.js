const router = require('express').Router();

// Import controllers
const adminMainController = require('../controllers/adminMainController');
const adminPhonesController = require('../controllers/adminPhonesController');

// admin main route
router.get('/', adminMainController.main);

// admin phones routes
router.get('/phones', adminPhonesController.phones);

// add new phone
router.get('/phones/add', adminPhonesController.addPhoneGet); 
router.post('/phones/add', adminPhonesController.addPhonePost); 

// read phone
router.get('/phones/read/:id', adminPhonesController.readPhone); 

// update phone
router.get('/phones/update/:id', adminPhonesController.updatePhoneGet);
router.post('/phones/update/:id', adminPhonesController.updatePhonePost);

// delete phone
router.get('/phones/delete/:id', adminPhonesController.deletePhone);


module.exports = router;