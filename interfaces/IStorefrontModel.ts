import Mongoose from "mongoose";

interface IStorefront extends Mongoose.Document {
    sellerId: string;
    storeId: string;
    storeName: string;
    storeDescription: string;
    invList: string[];
    salesHistory: string[];
    storePic: string;
    storeBanner: string;
}

export {IStorefront};