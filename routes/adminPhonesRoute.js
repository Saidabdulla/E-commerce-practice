const router = require('express').Router();

// Import controllers
const adminPhonesController = require('../controllers/adminPhonesController');

// admin phones routes
router.get('/', adminPhonesController.phones);

// add new phone
router.get('/add', adminPhonesController.addPhoneGet); 
router.post('/add', adminPhonesController.addPhonePost); 

// read phone
router.get('/read/:id', adminPhonesController.readPhone); 

// update phone
router.get('/update/:id', adminPhonesController.updatePhoneGet);
router.post('/update/:id', adminPhonesController.updatePhonePost);

// delete phone
router.get('/delete/:id', adminPhonesController.deletePhone);


module.exports = router;