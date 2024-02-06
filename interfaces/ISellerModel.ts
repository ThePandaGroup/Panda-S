import Mongoose from "mongoose";

interface ISeller extends Mongoose.Document {
    sellerName: string;
    sellerID: number;
    sellerEmail: string;
    sellerPassword: string;
    subscriptionID: number;
    storeID: number;
    invList: number[];
    salesHistory: number[];
}

export {ISeller};