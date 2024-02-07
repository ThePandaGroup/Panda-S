import Mongoose from "mongoose";

interface IStorefront extends Mongoose.Document {
    sellerID: number;
    storeID: number;
    invList: number[];
    salesHistory: number[];
    storePic: Buffer;
}

export {IStorefront};