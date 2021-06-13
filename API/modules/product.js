const mongoose = require('mongoose');
const itemSchema = new mongoose.Schema({
    item_name: {
        type: String,
        required: true,
    },
    item_discription: {
        type: String,
        required: true,
    },
    item_inventory: {
        type: Number,
        default: 0,
    },
    item_sale: {
        type: Boolean,
        required: true,
        default: false,
    },
    item_price: {
        type: Number,
        required: true,
    },
    item_extra_discription: {
        type: String
    }
})
const Item = mongoose.model('Item', itemSchema)
module.exports = Item