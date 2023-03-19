const express = require("express");
const router = express.Router();
const BookModel = require("../models/BookModel");
const AuthModel = require("../models/authModel");
const bookModule = require("../books");
const uuid = require("uuid");

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
        let reviewObjects = [];
        for(let bookObject of booksData){
            let bookReviews = [];
            for(let reviewObject of bookObject.bookReviews){
                const userData = await AuthModel.findOne({ userId: reviewObject.userId });
                bookReviews.push({
                    ...reviewObject,
                    authorName: userData.userName
                });
            }

            reviewObjects.push(bookReviews);
        }

        return res.status(200).send({
            success: true,
            books: booksData.map((bookObj, bookIndex) => {
                return {
                    ...bookObj._doc,
                    bookReviews: reviewObjects[bookIndex],
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
        const booksData = await BookModel.findOne({ bookId: bookId });
        let bookReviews = [];
        for(let reviewObject of booksData.bookReviews){
            const userData = await AuthModel.findOne({ userId: reviewObject.userId });
            bookReviews.push({
                ...reviewObject,
                authorName: userData.userName,
                userId: undefined
            });
        }

        return res.status(200).send({
            success: true,
            books: {
                ...booksData._doc,
                bookReviews: bookReviews,
                "_id": undefined,
                "__v": undefined
            }
        });
    }
});

router.post('/add-review/', async (req, res) => {
    const { userId, bookId, message } = req.body;

    const userData = await AuthModel.findOne({ userId: userId });
    if(userData === null){
        return res.status(404).send({
            success: false,
            message: "Please log in to add review!"
        });
    }

    const bookData = await BookModel.findOne({ bookId: bookId });
    if(bookData === null){
        return res.status(404).send({
            success: false,
            message: "No such book found!"
        });   
    }

    let reviewObject = {
        "reviewId": uuid.v4(),
        "userId": userId,
        "message": message,
        "createdAt": new Date().toJSON()
    };

    const addedReviewData = await BookModel.updateOne({
        bookId: bookId
    }, {
        $push: { bookReviews: reviewObject }
    });

    if(addedReviewData){
        return res.status(200).send({
            success: true,
            message: "Successfully added review"
        });
    }
});

router.post('/edit-review/', async (req, res) => {
    const { userId, bookId, reviewId, newMessage } = req.body;

    const userData = await AuthModel.findOne({ userId: userId });
    if(userData === null){
        return res.status(404).send({
            success: false,
            message: "Please log in to add review!"
        });
    }

    const bookData = await BookModel.findOne({ bookId: bookId });
    if(bookData === null){
        return res.status(404).send({
            success: false,
            message: "No such book found!"
        });   
    }

    const editedReview = await BookModel.updateOne(
        { 
            bookId: bookId,
            "bookReviews.reviewId": reviewId, 
            "bookReviews.userId": userId
        },
        {
           $set: { "bookReviews.$.message": newMessage }
        }
    );

    if(editedReview){
        return res.status(200).send({
            success: true,
            message: "Successfully edited review!"
        });
    } else {
        return res.status(404).send({
            success: true,
            message: "Review not found!"
        });
    }
});

module.exports = router;