const router = require('express').Router();

// Import controllers
const adminComputersController = require('../controllers/adminComputersController');

// admin computers routes
router.get('/', adminComputersController.computers);

// add new computer
router.get('/add', adminComputersController.addComputerGet); 
router.post('/add', adminComputersController.addComputerPost); 

// read computer
router.get('/read/:id', adminComputersController.readComputer); 

// update computer
router.get('/update/:id', adminComputersController.updateComputerGet);
router.post('/update/:id', adminComputersController.updateComputerPost);

// delete computer
router.get('/delete/:id', adminComputersController.deleteComputer);


module.exports = router;