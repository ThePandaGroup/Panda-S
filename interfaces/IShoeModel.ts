import Mongoose from "mongoose";

interface IShoe extends Mongoose.Document {
    shoeName: string;
    shoeDescription: string;
    shoeId: number;
    shoeSize: number;
    shoeRating: number;
    sellerId: number;
    shoePrice: number;
}

export {IShoe};