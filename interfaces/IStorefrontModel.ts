import Mongoose from "mongoose";

interface IStorefront extends Mongoose.Document {
    sellerId: string;
    storeId: number;
    storeName: string;
    storeDescription: string;
    invList: string[];
    salesHistory: string[];
    storePic: string;
}

export {IStorefront};