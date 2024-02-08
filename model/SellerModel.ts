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
            sellerId: String,
            sellerEmail: String,
            sellerPassword: String,
            subscriptionID: Number,
        }, { collection: "sellers" });
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString);
            this.model = Mongoose.model<ISeller>("sellers", this.schema);
        } catch (e) {
            console.error(e);
        }
    }

    public async retrieveSellerInfo(response:any, value:number) {
        var query = this.model.findOne({"sellerId": value});
        try {
            const result = await query.exec();
            response.json(result) ;
        }
        catch (e) {
            console.error(e);
        }
    }


    public async retrieveAllSellers(response:any) {
        var query = this.model.find({});
        try {
        const sellerArray = await query.exec();
        response.json(sellerArray);
        }
        catch(e) {
            console.log(e);
        }
    }


}

export {SellerModel};