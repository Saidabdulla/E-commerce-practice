const router = require('express').Router();

// Import controllers
const mainController = require('../controllers/main');

router.get('/', mainController.main);

module.exports = router;