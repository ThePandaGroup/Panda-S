import Mongoose from "mongoose";

interface IStorefront extends Mongoose.Document {
    sellerID: string;
    storeID: string;
    invList: string[];
    salesHistory: string[];
    storePic: string;
}

export {IStorefront};