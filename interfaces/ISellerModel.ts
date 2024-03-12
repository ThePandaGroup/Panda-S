import Mongoose from "mongoose";

interface ISeller extends Mongoose.Document {
    sellerName: string;
    sellerId: string;
    sellerEmail: string;
    subscriptionID: number;
}

export {ISeller};