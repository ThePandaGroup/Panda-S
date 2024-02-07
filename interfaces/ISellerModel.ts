import Mongoose from "mongoose";

interface ISeller extends Mongoose.Document {
    sellerName: string;
    sellerID: string;
    sellerEmail: string;
    sellerPassword: string;
    subscriptionID: number;
}

export {ISeller};