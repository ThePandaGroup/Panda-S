import * as Mongoose from "mongoose";
import { ISeller } from "../interfaces/ISellerModel";
import { BuyerModel } from "./BuyerModel";

class SellerModel {
    public schema: any;
    public model: any;
    public dbConnectionString: string;

    public constructor(dbConnectionString: string) {
        this.dbConnectionString = dbConnectionString;
        this.createSchema();
        this.createModel();
    }

    public createSchema() {
        this.schema = new Mongoose.Schema({
            sellerName: String,
            sellerID: Number,
            sellerEmail: String,
            sellerPassword: String,
            subscriptionID: Number,
            storeID: Number,
            invList: [{ type: Number }],
            salesHistory: [{ type: Number }],
        }, { collection: "sellers" });
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString);
            this.model = Mongoose.model<ISeller>("Seller", this.schema);
        } catch (e) {
            console.error(e);
        }
    }

    

}

export {SellerModel};