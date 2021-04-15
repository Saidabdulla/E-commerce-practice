const mongoose = require('mongoose');

// Import models 
const PhoneModel = require('../models/phone');

// Middleware
const multerMiddleware = require('../middleware/multer');


exports.phones = async (req, res) => {
    try {
        const phones = await PhoneModel.find();
        
        res.status(200).render('./admin/admin-phones', { 
            phones: phones,
            title: 'Admin | Phones',
            layout: './admin/admin-layout' 
        });
    } 
    catch (err) {
        console.log(err);
    }
}

exports.phonesAddGet = async (req, res) => {
    try {
        res.status(200).render('./admin/admin-add-phone', { 
            title: 'Admin | Phones',
            layout: './admin/admin-add-phone',
            msg: ''
        });
    } 
    catch (err) {
        console.log(err);
    }
}

exports.phonesAddPost = async (req, res) => {
    multerMiddleware(req, res, async (err) => {
        if (err) {
            return res.status(400).render('./admin/admin-add-phone', {
                title: 'Admin | Phones',
                layout: './admin/admin-add-phone',
                msg: err
            });
        }
     
        try {
            const newPhone = await new PhoneModel({
                img: `/uploads/${req.file.filename}`,
                title: req.body.title,
                brand: req.body.brand,
                price: req.body.price,
                discountPrice: req.body.discountPrice,
                rating: req.body.rating,
                isDiscount: req.body.isDiscount,
                info: `lorem`
            });

            await newPhone.save();
            res.status(201).redirect('/admin/phones');
        } 
        catch (e) {
            console.log(e);
        }   
       
    });
}

