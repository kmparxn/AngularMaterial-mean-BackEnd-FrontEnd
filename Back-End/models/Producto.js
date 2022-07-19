const mongoose = require('mongoose');

const ProductoSchema = mongoose.Schema({
    productname: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    freshness: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Producto', ProductoSchema);