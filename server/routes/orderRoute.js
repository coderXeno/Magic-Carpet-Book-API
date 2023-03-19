const express = require("express");
const authModel = require("../models/authModel");
const BookModel = require("../models/BookModel");
const orderModel = require("../models/orderModel");
const uuid = require("uuid");
const router = express.Router();

router.post('/place-order/', async (req, res) => {
    const { userId, bookIds, qtys, address } = req.body;

    const userData = await authModel.findOne({ userId: userId });
    if(userData === null){
        return res.status(404).send({
            success: false,
            message: "Please log in to add to cart!"
        });
    }

    if(bookIds.length !== qtys.length){
        return res.status(400).send({
            success: false,
            message: "Number of different books and number of quantity must be same!"
        })
    }

    let netPrice = 0;
    for(let i = 0; i < bookIds.length; i++){
        const bookData = await BookModel.findOne({ bookId: bookIds[i] });
        if(bookData === null){
            return res.status(404).send({
                success: false,
                message: "No such book found!"
            });   
        } else {
            netPrice += bookData.bookPrice * qtys[i];
        }
    }

    const orderData = await orderModel.findOne({ userId: userId });
    if(orderData === null){
        const newOrderModel = new orderModel;
        newOrderModel.userId = userId;
        newOrderModel.orders = [{
            orderId: uuid.v4(),
            bookIds: bookIds,
            quantity: qtys,
            orderDate: new Date().toJSON(),
            bill: netPrice,
            deliveryAddress: address
        }];

        const newOrder = await newOrderModel.save();
        if(newOrder){
            return res.status(200).send({
                success: true,
                message: `Order worth ${netPrice} dollars placed! All the products will be delivered to ${address}!`
            });
        }
    } else {
        let bookObject = {
            orderId: uuid.v4(),
            bookIds: bookIds,
            quantity: qtys,
            orderDate: new Date().toJSON(),
            bill: netPrice,
            deliveryAddress: address
        };

        const addOrder = await orderModel.updateOne({
            userId: userId
        }, {
            $push: { orders: bookObject }
        });

        if(addOrder){
            return res.status(200).send({
                success: true,
                message: `Order worth ${netPrice} dollars placed! All the products will be delivered to ${address}!`
            }); 
        }
    }
});

router.get('/view-past-orders/:userId', async (req, res) => {
    const userId = req.params.userId;
    const userData = await authModel.findOne({ userId: userId });
    if(userData === null){
        return res.status(404).send({
            success: false,
            message: "Please log in to add to cart!"
        });
    }

    const pastOrders = await orderModel.findOne({ userId: userId });
    if(pastOrders !== null){
        console.log(pastOrders);
        return res.status(200).send({
            success: true,
            pastOrders: pastOrders.orders.map((orderObj) => {
                return {
                    ...orderObj._doc,
                    "_id": undefined
                }
            })
        });
    } else {
        return res.status(200).send({
            success: true,
            pastOrders: [] 
        });
    }
});

module.exports = router;