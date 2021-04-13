const mongoose = require('mongoose');

// Import models 
const PhoneModel = require('../models/phone');

exports.main = async (req, res) => { 
    try {
        const phones = await PhoneModel.find();
        res.status(200).render('main', { title: 'Main', phones: phones });
    } 
    catch (e) {
        console.log(e);
    }
}
