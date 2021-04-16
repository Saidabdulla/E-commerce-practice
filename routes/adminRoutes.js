const router = require('express').Router();

// Import controllers
const adminMainController = require('../controllers/adminMainController');
const adminPhonesController = require('../controllers/adminPhonesController');

// admin main route
router.get('/', adminMainController.main);

// admin phones routes
router.get('/phones', adminPhonesController.phones); // get All phones

router.get('/phones/add', adminPhonesController.phonesAddGet); // get form for add new phone
router.post('/phones/add', adminPhonesController.phonesAddPost); // new phone

// router.get('/phones/read/:id', adminPhonesController.phonesReadById); get phones by ID



module.exports = router;