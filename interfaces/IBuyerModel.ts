import Mongoose from "mongoose";

interface IBuyer extends Mongoose.Document {
    buyerName: string;
    buyerID: string;
    buyerEmail: string;
    buyerPassword: string;
    subscriptionID: number;
    shippingAddr: string;
    orderHistory: string[];
    cart: string[];
}

export {IBuyer};