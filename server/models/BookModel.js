var mongoose = require("mongoose");

const bookModel = new mongoose.Schema({
    bookId: {
        type: String,
        unique: true,
        required: true
    },
    createdAt: {
        type: Date,
    },
    bookName: {
        type: String,
        required: true
    },
    bookAuthor: {
        type: String,
        required: true
    },
    bookRating: {
        type: Number
    },
    bookSynopsis: {
        type: String,
    },
    bookPrice: {
        type: Number,
        required: true
    },
    bookReviews: {
        type: Array
    }
});

module.exports = mongoose.model("bookModel", bookModel);