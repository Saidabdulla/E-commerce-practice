const router = require('express').Router();

// Import controllers
const adminBooksController = require('../controllers/adminBooksController');

// admin book routes
router.get('/', adminBooksController.books);

// add new book
router.get('/add', adminBooksController.addBookGet); 
router.post('/add', adminBooksController.addBookPost); 

// read book
router.get('/read/:id', adminBooksController.readBook); 

// update book
router.get('/update/:id', adminBooksController.updateBookGet);
router.post('/update/:id', adminBooksController.updateBookPost);

// delete book
router.get('/delete/:id', adminBooksController.deleteBook);

module.exports = router;