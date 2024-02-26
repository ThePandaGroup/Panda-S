import Mongoose from "mongoose";

interface IShoe extends Mongoose.Document {
    shoeName: string;
    shoeDescription: string;
    shoeId: string;
    shoeSize: number;
    shoeRating: number;
    storeId: number;
    shoePrice: number;
    shoeQuantity: number;
}

export {IShoe};