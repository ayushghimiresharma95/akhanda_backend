const mongoose = require('mongoose');
const { Schema, model, models } = mongoose;

const OrdersSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        message: {
            type: String,
        },
        OrderDone: {
            type: Boolean,
            required: true,
        },
        cartItems: [{
            item: {
                type: String,
                required: true,
            },
            price: {
                type: String,
                required: true,
            },
            quantity: {
                type: String,
                required: true,
            }
        }],
        totalamout:{
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

const Orders = models.Orders || model('Orders', OrdersSchema);

module.exports = Orders;
