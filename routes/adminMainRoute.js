const router = require('express').Router();

// Import controllers
const adminMainController = require('../controllers/adminMainController');

// admin main route
router.get('/', adminMainController.main);

module.exports = router;