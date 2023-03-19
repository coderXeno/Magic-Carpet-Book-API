const express = require("express");
const router = express.Router();
const BookModel = require("../models/BookModel");
const AuthModel = require("../models/authModel");
const bookModule = require("../books");

router.get('/get-all-books/:userId', async (req, res) => {
    const userId = req.params.userId;
    const authData = await AuthModel.findOne({ userId: userId });
    if(authData === null){
        return res.status(200).send({
            success: false,
            message: "Please log in to view books"
        });
    } else {
        const booksData = await BookModel.find({ });
        return res.status(200).send({
            success: true,
            books: booksData.map((bookObj) => {
                return {
                    ...bookObj._doc,
                    "_id": undefined,
                    "__v": undefined
                }
            })
        });
    }
});

router.get('/get-book-details/:userId/:bookId', async (req, res) => {
    const userId = req.params.userId;
    const bookId = req.params.bookId;
    const authData = await AuthModel.findOne({ userId: userId });
    if(authData === null){
        return res.status(200).send({
            success: false,
            message: "Please log in to view books"
        });
    } else {
        const booksData = await BookModel.find({ bookId: bookId });
        return res.status(200).send({
            success: true,
            books: booksData
        });
    }
});

module.exports = router;