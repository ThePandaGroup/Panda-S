import Mongoose from "mongoose";

interface IBuyer extends Mongoose.Document {
    buyerName: string;
    buyerID: number;
    buyerEmail: string;
    buyerPassword: string;
    subscriptionID: number;
    shippingAddr: string;
    orderHistory: number[];
    cart: number[];
}

export {IBuyer};