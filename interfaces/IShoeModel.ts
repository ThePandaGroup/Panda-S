import Mongoose from "mongoose";

interface IShoe extends Mongoose.Document {
    shoeName: string;
    shoeDescription: string;
    shoeId: string;
    shoeSize: number;
    shoeRating: number;
    storeId: string;
    shoePrice: number;
    shoeQuantity: number;
    shoePic: string;
}

export {IShoe};