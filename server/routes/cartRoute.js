const express = require("express");
const authModel = require("../models/authModel");
const BookModel = require("../models/BookModel");
const cartModel = require("../models/cartModel");
const router = express.Router();

router.post('/add-to-cart/', async(req, res) => {
    const { userId, bookId } = req.body;

    const userData = await authModel.findOne({ userId: userId });
    if(userData === null){
        return res.status(404).send({
            success: false,
            message: "Please log in to add to cart!"
        });
    }

    const bookData = await BookModel.findOne({ bookId: bookId });
    if(bookData === null){
        return res.status(404).send({
            success: false,
            message: "No such book found!"
        });   
    }

    const cartData = await cartModel.findOne({
        userId: userId
    });

    if(cartData === null){
        const newCartModel = new cartModel;
        newCartModel.userId = userId;
        newCartModel.cartItems = [{
            bookId: bookId,
            addedDate: new Date().toJSON()
        }];

        const cartData = await newCartModel.save();
        return res.status(200).send({
            success: "true",
            message: "Added book to cart"
        });
    } else {
        const specificBook = await cartModel.findOne({
            userId: userId,
            "cartItems.bookId": bookId
        });

        let newBookObject = {
            bookId: bookId,
            addedDate: new Date().toJSON()
        };

        if(specificBook === null){
            const addedBook = await cartModel.updateOne({
                userId: userId       
            }, {
                $push: { cartItems: newBookObject }
            });

            return res.status(200).send({
                success: true,
                message: "Added book to cart"
            });
        } else {
            return res.status(200).send({
                success: false,
                message: "This book is already present in your cart!"
            });
        }
    }
});

router.post('/remove-from-cart/', async(req, res) => {
    const { userId, bookId } = req.body;

    const userData = await authModel.findOne({ userId: userId });
    if(userData === null){
        return res.status(404).send({
            success: false,
            message: "Please log in to add to cart!"
        });
    }

    const bookData = await BookModel.findOne({ bookId: bookId });
    if(bookData === null){
        return res.status(404).send({
            success: false,
            message: "No such book found!"
        });   
    }

    const cartData = await cartModel.findOne({
        userId: userId
    });

    if(cartData === null){
        return res.status(200).send({
            success: false,
            message: "No items present in cart to remove!"
        });
    } else {
        const specificBook = await cartModel.findOne({
            userId: userId,
            "cartItems.bookId": bookId
        });

        let newBookObject = {
            bookId: bookId,
            addedDate: new Date().toJSON()
        };

        if(specificBook !== null){
            const removedBook = await cartModel.updateOne({
                userId: userId       
            }, {
                $pull: { cartItems: { bookId: bookId } }
            });

            return res.status(200).send({
                success: true,
                message: "Removed book from cart"
            });
        } else {
            return res.status(200).send({
                success: false,
                message: "This book is not present in your cart!"
            });
        }
    }
});

router.get('/get-books-in-cart/:userId', async (req, res) => {
    const userId = req.params.userId;

    const userData = await authModel.findOne({ userId: userId });
    if(userData === null){
        return res.status(404).send({
            success: false,
            message: "Please log in to add to cart!"
        });
    }

    const cartData = await cartModel.findOne({ userId: userId });
    const booksData = [];
    for(let bookObject of cartData.cartItems){
        let bookData = await BookModel.findOne({ bookId: bookObject.bookId });
        booksData.push({
            ...bookData._doc,
            "_id": undefined,
            "__v": undefined
        });
    }

    return res.status(200).send({
        success: true,
        cartItems: booksData
    });
});

module.exports = router;