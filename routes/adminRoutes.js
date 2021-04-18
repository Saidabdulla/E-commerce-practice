const router = require('express').Router();

// Import controllers
const adminMainController = require('../controllers/adminMainController');
const adminPhonesController = require('../controllers/adminPhonesController');
const adminComputersController = require('../controllers/adminComputersController');
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



// admin computers routes
router.get('/computers', adminComputersController.computers);

// add new computer
router.get('/computers/add', adminComputersController.addComputerGet); 
router.post('/computers/add', adminComputersController.addComputerPost); 

// read computer
router.get('/computers/read/:id', adminComputersController.readComputer); 

// update computer
router.get('/computers/update/:id', adminComputersController.updateComputerGet);
router.post('/computers/update/:id', adminComputersController.updateComputerPost);

// delete computer
router.get('/computers/delete/:id', adminComputersController.deleteComputer);


module.exports = router;