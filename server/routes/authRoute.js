const express = require("express");
const router = express.Router();
const AuthModel = require("../models/authModel");
const BookModel = require("../models/BookModel");
const uuid = require("uuid");
const bookModule = require("../books");

router.post("/register/", async (req, res) => {
    const { userName, email, password } = req.body;
    const loginData = await AuthModel.findOne({
        email: email
    });

    if(loginData !== null){
        return res.status(200).send({
            message: "An account with the given credentials already exists! Please login to continue!"
        });
    } 

    const newModel = new AuthModel;
    newModel.userId = uuid.v4();
    newModel.userName = userName;
    newModel.email = email;
    newModel.password = password;
    newModel.createdAt = Date.now();

    const booksData = await BookModel.find({ });
    if(booksData === [] || booksData.length === 0){
        for(let bookObject of bookModule.books){
            const newBookModel = new BookModel;
            newBookModel.bookId = bookObject.id;
            newBookModel.bookName = bookObject.name;
            newBookModel.bookAuthor = bookObject.author;
            newBookModel.bookRating = bookObject.rating;
            newBookModel.bookSynopsis = bookObject.synopsis;
            newBookModel.bookPrice = bookObject.price;

            const books = await newBookModel.save();
        }
    }

    const data = await newModel.save();
    return res.status(200).send({
        success: true,
        message: "Added user to db",
        data: {
            userName: data.userName,
            userId: data.userId,
            createdAt: data.createdAt,
            email: data.email
        }
    });
});

router.post("/login/", async (req, res) => {
    const { userName, password } = req.body;

    const loginData = await AuthModel.findOne({
        userName: userName,
        password: password
    });

    return res.status(200).send({
        success: true,
        message: "Logged in successfully",
        data: {
            userName: loginData.userName,
            userId: loginData.userId,
            createdAt: loginData.createdAt,
            email: loginData.email
        }
    });
});

module.exports = router;