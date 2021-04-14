const mongoose = require('mongoose');

const compSchema = new mongoose.Schema({
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
    },
    info: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('computers', compSchema);