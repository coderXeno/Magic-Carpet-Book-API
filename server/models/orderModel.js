var mongoose = require("mongoose");

const orderModel = new mongoose.Schema({
    userId: {
        type: String,
        unique: true,
        required: true
    },
    orders: [{
        orderId: {
            type: String,
            unique: true
        },
        bookIds: {
            type: Array
        },
        quantity: {
            type: Array
        },
        orderDate: {
            type: Date
        },
        bill: {
            type: Number
        },
        deliveryAddress: {
            type: String
        }
    }]
});

module.exports = mongoose.model("orderModel", orderModel);