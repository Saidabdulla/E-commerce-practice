const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    img: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: Array,
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

module.exports = mongoose.model('books', bookSchema);