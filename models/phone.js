const mongoose = require('mongoose');

const phoneSchema = new mongoose.Schema({
    img: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    discountPrice: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    isDiscount: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('phones', phoneSchema);