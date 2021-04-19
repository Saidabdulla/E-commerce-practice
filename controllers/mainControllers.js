const mongoose = require('mongoose');

// Import models 
const PhoneModel = require('../models/phone');
const CompModel = require('../models/computer');
const BookModel = require('../models/book');

exports.main = async (req, res) => { 
    try {
        const phones = await PhoneModel.find().limit(6).sort({ _id: -1 });
        const computers = await CompModel.find();
        const books = await BookModel.find();

        res.status(200).render('main', { 
            title: 'Main', 
            phones: phones, 
            comps: computers,
            books: books,
            layout: 'main'
        });
    } 
    catch (e) {
        console.log(e);
    }
}
