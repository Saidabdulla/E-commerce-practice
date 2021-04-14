const router = require('express').Router();

// Import controllers
const mainControllers = require('../controllers/mainControllers');

router.get('/', mainControllers.main);

module.exports = router;