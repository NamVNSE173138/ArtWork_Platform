
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const checkoutSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        amount: {
            type: Number,
            required: true,
        },
        bankName: {
            type: String,
            required: true,
        },
        payDate: {
            type: String,
            required: true,
        },
        transCode: {
            type: String,
            required: true,
        },
    },
);


const Checkout = mongoose.model("Checkout", checkoutSchema);
module.exports = Checkout;