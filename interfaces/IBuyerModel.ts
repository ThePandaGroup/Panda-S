import Mongoose from "mongoose";

interface CartItem {
    shoeID: string;
    addedAt: Date;
}



interface IBuyer extends Mongoose.Document {
    buyerName: string;
    buyerId: string;
    buyerEmail: string;
    buyerPassword: string;
    subscriptionID: number;
    shippingAddr: string;
    orderHistory: string[];
    cart: CartItem[];
    googleId: string;
}

export {IBuyer};