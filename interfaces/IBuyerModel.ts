import Mongoose from "mongoose";

interface IBuyer extends Mongoose.Document {
    buyerName: string;
    buyerId: string;
    buyerEmail: string;
    buyerPassword: string;
    subscriptionID: number;
    shippingAddr: string;
    orderHistory: string[];
    cart: string[];
}

export {IBuyer};