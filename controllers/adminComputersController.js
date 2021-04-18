const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

// Import models
const ComputerModel = require('../models/computer');

// Middleware
const multerMiddleware = require('../middleware/multer');

// get all computers
exports.computers = async (req, res) => {     
    try {
        const comps = await ComputerModel.find();

        res.status(200).render('./admin/admin-products', {
            title: 'Admin | Computers',
            productName: 'computers',
            products: comps,
            layout: './admin/admin-layout' 
        });
    }
    catch (e) {
        console.log(e);
    }
}

// get form for add new computer
exports.addComputerGet = async (req, res) => {
    try {
        res.status(200).render('./admin/admin-add-product', { 
            title: 'Admin | Phones',
            productName: 'computers',
            layout: './admin/admin-add-product',
            msg: ''
        });
    } 
    catch (err) {
        console.log(err);
    }
}

// add new computer
exports.addComputerPost = async (req, res) => {
    multerMiddleware(req, res, async (err) => {
        if (err) {
            return res.status(400).render('./admin/admin-add-product', {
                title: 'Admin | Computers',
                productName: 'computers',
                layout: './admin/admin-add-product',
                msg: err
            });
        }
     
        try {
            const newComp = await new ComputerModel({
                img: `/uploads/${req.file.filename}`,
                title: req.body.title,
                brand: req.body.brand,
                price: req.body.price,
                discountPrice: req.body.discountPrice,
                rating: req.body.rating,
                isDiscount: req.body.isDiscount,
                info: req.body.info
            });

            await newComp.save();
            res.status(201).redirect('/admin/computers');
        } 
        catch (e) {
            console.log(e);
        }   
       
    });
}

// read computers by id
exports.readComputer = async (req, res) => {
    try {
        const comp = await ComputerModel.findOne({_id:req.params.id});
        res.status(200).render('admin/admin-read-product', {
            layout: 'admin/admin-layout',
            product: comp,
            title: 'Admin | Computers',
            productName: 'computers'
        });
    }
    catch (e) {
        console.log(e);
    }
}

// get form for update computer
exports.updateComputerGet = async (req, res) => {
    const comp = await ComputerModel.findOne({_id: req.params.id});

    try {
        res.status(200).render('./admin/admin-update-product', { 
            title: 'Admin | Computers',
            layout: './admin/admin-update-product',
            msg: '',
            product: comp,
            productName: 'computers'
        });
    } 
    catch (err) {
        console.log(err);
    }
}

// update computer by id
exports.updateComputerPost = async (req, res) => {

    const comp = await ComputerModel.findOne({_id: req.params.id});

    multerMiddleware(req, res, async (err) => {
        if (err) {
            return res.status(400).render('./admin/admin-update-product', { 
                title: 'Admin | Computers',
                layout: './admin/admin-update-product',
                msg: err,
                product: comp,
                productName: 'computers'
            });
        }
     
        try {  
            await fs.unlink(path.join(__dirname, '../public', comp.img), (err) => {
                if(err) return console.log(err);
            });

            await ComputerModel.updateOne(
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

            res.status(200).redirect('/admin/computers');
        } 
        catch (e) {
            console.log(e);
        }   
       
    });
}

// delete computer by id
exports.deleteComputer = async (req, res) => {
    try {
        const deletedComp =  await ComputerModel.findByIdAndDelete(req.params.id);

        await fs.unlink(path.join(__dirname, '../public', deletedComp.img), (err) => {
            if(err) return console.log(err);
        });
        
        res.status(200).redirect('/admin/computers');
    }
    catch (error) {
        console.log(error);   
    }
}