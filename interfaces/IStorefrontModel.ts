import Mongoose from "mongoose";

interface IStorefront extends Mongoose.Document {
    sellerID: string;
    storeID: string;
    invList: string[];
    salesHistory: string[];
}

export {IStorefront};