const mongoose = require('mongoose');

// Import models 
const PhoneModel = require('../models/phone');
// const CompModel = require('../models/computer');
// const BookModel = require('../models/book');

exports.main = (req, res) => {
    res.status(200).render('./admin/admin-main', { 
        title: 'Admin | Main',
        layout: './admin/admin-layout' 
    });
}

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

// admin panelga phones massivi getib duribdi xozircha, qolganini ham yazish garak
