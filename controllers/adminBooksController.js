const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

// Import models
const BookModel = require('../models/book');

// Middleware
const multerMiddleware = require('../middleware/multer');

// get all books
exports.books = async (req, res) => {     
    try {
        const books = await BookModel.find();

        res.status(200).render('./admin/admin-products', {
            title: 'Admin | Books',
            productName: 'books',
            products: books,
            layout: './admin/admin-layout' 
        });
    }
    catch (e) {
        console.log(e);
    }
}

// get form for add new book
exports.addBookGet = async (req, res) => {
    try {
        res.status(200).render('./admin/admin-add-product', { 
            title: 'Admin | Books',
            productName: 'books',
            layout: './admin/admin-add-product',
            msg: ''
        });
    } 
    catch (err) {
        console.log(err);
    }
}

// add new book
exports.addBookPost = async (req, res) => {
    multerMiddleware(req, res, async (err) => {
        if (err) {
            return res.status(400).render('./admin/admin-add-product', {
                title: 'Admin | Books',
                productName: 'books',
                layout: './admin/admin-add-product',
                msg: err
            });
        }
     
        try {
            const newBook = await new BookModel({
                img: `/uploads/${req.file.filename}`,
                title: req.body.title,
                author: req.body.author,
                category: req.body.category.split(','),
                price: req.body.price,
                discountPrice: req.body.discountPrice,
                rating: req.body.rating,
                isDiscount: req.body.isDiscount,
                info: req.body.info
            });

            await newBook.save();
            res.status(201).redirect('/admin/books');
        } 
        catch (e) {
            console.log(e);
        }   
       
    });
}

// read book by id
exports.readBook = async (req, res) => {
    try {
        const book = await BookModel.findOne({_id:req.params.id});
        res.status(200).render('admin/admin-read-product', {
            layout: 'admin/admin-layout',
            product: book,
            title: 'Admin | Books',
            productName: 'books'
        });
    }
    catch (e) {
        console.log(e);
    }
}

// get form for update book
exports.updateBookGet = async (req, res) => {
    const book = await BookModel.findOne({_id: req.params.id});

    try {
        res.status(200).render('./admin/admin-update-product', { 
            title: 'Admin | Books',
            layout: './admin/admin-update-product',
            msg: '',
            product: book,
            productName: 'books'
        });
    } 
    catch (err) {
        console.log(err);
    }
}

// update book by id
exports.updateBookPost = async (req, res) => {

    const book = await BookModel.findOne({_id: req.params.id});

    multerMiddleware(req, res, async (err) => {
        if (err) {
            return res.status(400).render('./admin/admin-update-product', { 
                title: 'Admin | Books',
                layout: './admin/admin-update-product',
                msg: err,
                product: book,
                productName: 'books'
            });
        }
     
        try {  
            await fs.unlink(path.join(__dirname, '../public', book.img), (err) => {
                if(err) return console.log(err);
            });

            await BookModel.updateOne(
                { _id: req.params.id },
                {
                    $set: {
                        img: `/uploads/${req.file.filename}`,
                        title: req.body.title,
                        author: req.body.author,
                        category: req.body.category.split(','),
                        price: req.body.price,
                        discountPrice: req.body.discountPrice,
                        rating: req.body.rating,
                        isDiscount: req.body.isDiscount,
                        info: req.body.info
                    }
                });

            res.status(200).redirect('/admin/books');
        } 
        catch (e) {
            console.log(e);
        }   
       
    });
}

// delete book by id
exports.deleteBook = async (req, res) => {
    try {
        const deletedBook =  await BookModel.findByIdAndDelete(req.params.id);

        await fs.unlink(path.join(__dirname, '../public', deletedBook.img), (err) => {
            if(err) return console.log(err);
        });
        
        res.status(200).redirect('/admin/books');
    }
    catch (error) {
        console.log(error);   
    }
}