const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

// Import models 
const PhoneModel = require('../models/phone');

// Middleware
const multerMiddleware = require('../middleware/multer');

// get all phones
exports.phones = async (req, res) => {
    try {
        const phones = await PhoneModel.find();
        
        res.status(200).render('./admin/admin-products', { 
            products: phones,
            title: 'Admin | Phones',
            productName: 'phones',
            layout: './admin/admin-layout' 
        });
    } 
    catch (err) {
        console.log(err);
    }
}

// get form for add new phone
exports.addPhoneGet = async (req, res) => {
    try {
        res.status(200).render('./admin/admin-add-product', { 
            title: 'Admin | Phones',
            productName: 'phones',
            layout: './admin/admin-add-product',
            msg: ''
        });
    } 
    catch (err) {
        console.log(err);
    }
}

// add new phone
exports.addPhonePost = async (req, res) => {
    multerMiddleware(req, res, async (err) => {
        if (err) {
            return res.status(400).render('./admin/admin-add-phone', {
                title: 'Admin | Phones',
                productName: 'phones',
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
exports.readPhone = async (req, res) => {
    try {
        const phone = await PhoneModel.findOne({_id:req.params.id});
        res.status(200).render('admin/admin-read-product', {
            layout: 'admin/admin-layout',
            product: phone,
            title: 'Admin | Phones',
            productName: 'phones'
        });
    }
    catch (e) {
        console.log(e);
    }
}

// get form for update phone
exports.updatePhoneGet = async (req, res) => {
    const phone = await PhoneModel.findOne({_id: req.params.id});

    try {
        res.status(200).render('./admin/admin-update-product', { 
            title: 'Admin | Phones',
            layout: './admin/admin-update-product',
            msg: '',
            product: phone,
            productName: 'phones'
        });
    } 
    catch (err) {
        console.log(err);
    }
}

// update phone by id
exports.updatePhonePost = async (req, res) => {

    const phone = await PhoneModel.findOne({_id: req.params.id});

    multerMiddleware(req, res, async (err) => {
        if (err) {
            return res.status(400).render('./admin/admin-update-phone', { 
                title: 'Admin | Phones',
                layout: './admin/admin-update-phone',
                msg: err,
                phone: phone,
                productName: 'phones'
            });
        }
     
        try {
            await fs.unlink(path.join(__dirname, '../public', phone.img), (err) => {
                if(err) return console.log(err);
            });
    

            await PhoneModel.updateOne(
                { _id: req.params.id },
                {
                    $set: {
                        img: `/uploads/${req.file.filename}`,
                        title: req.body.title,
                        brand: req.body.brand,
                        price: req.body.price,
                        discountPrice: req.body.discountPrice,
                        rating: req.body.rating,
                        isDiscount: req.body.isDiscount,
                        info: req.body.info
                    }
                });

            res.status(200).redirect('/admin/phones');
        } 
        catch (e) {
            console.log(e);
        }   
       
    });
}

// delete phone by id
exports.deletePhone = async (req, res) => {
    try {
        const deletedPhone = await PhoneModel.findByIdAndDelete(req.params.id);

        await fs.unlink(path.join(__dirname, '../public', deletedPhone.img), (err) => {
            if(err) return console.log(err);
        });

        res.status(200).redirect('/admin/phones');
    }
    catch (error) {
        console.log(error);   
    }
}