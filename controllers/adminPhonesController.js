const mongoose = require('mongoose');

// Import models 
const PhoneModel = require('../models/phone');

// Middleware
const multerMiddleware = require('../middleware/multer');

// get all phones
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

// get form for add new phone
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

// add new phone
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
                info: req.body.info
            });

            await newPhone.save();
            res.status(201).redirect('/admin/phones');
        } 
        catch (e) {
            console.log(e);
        }   
       
    });
}

// read phones by id
exports.phonesReadById = async (req, res) => {
    try {
        const phone = await PhoneModel.findOne({_id:req.params.id});
        res.status(200).render('admin/admin-read-product', {
            layout: 'admin/admin-layout',
            product: phone,
            title: 'Admin | Phones'
        });
    }
    catch (e) {
        console.log(e);
    }
}

// delete phone by id
exports.deletePhone = async (req, res) => {
    try {
        await PhoneModel.findByIdAndDelete(req.params.id);
        res.status(200).redirect('/admin/phones');
    }
    catch (error) {
        console.log(error);   
    }
}