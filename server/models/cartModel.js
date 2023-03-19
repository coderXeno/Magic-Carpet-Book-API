var mongoose = require("mongoose");

const cartModel = new mongoose.Schema({
    userId: {
        type: String,
        unique: true,
        required: true
    },
    cartItems: [{
        bookId: {
            type: String
        },
        addedDate: {
            type: Date
        }
    }]
});

module.exports = mongoose.model("cartModel", cartModel);