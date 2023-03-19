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
                authorName: userData.userName
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

module.exports = router;