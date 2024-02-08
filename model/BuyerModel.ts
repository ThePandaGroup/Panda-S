import * as Mongoose from "mongoose";
import {IBuyer} from '../interfaces/IBuyerModel';
import { log } from "console";

class BuyerModel {
    public schema:any;
    public model:any;
    public dbConnectionString:string;

    public constructor(DB_CONNECTION_STRING:string) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }

    public createSchema() {
        this.schema = new Mongoose.Schema(
            {
                buyerName: String,
                buyerId: String,
                buyerEmail: String,
                buyerPassword: String,
                subscriptionID: Number,
                shippingAddr: String,
                orderHistory: [String]
            }, {collection: 'buyers'}
        );    
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString);
            this.model = Mongoose.model<IBuyer>("buyers", this.schema);
        }
        catch (e) {
            console.error(e);
        }
    }

    public async retrieveBuyerInfo(response:any, value:number) {
        var query = this.model.findOne({"buyerId": value});
        try {
            const result = await query.exec();
            response.json(result) ;
        }
        catch (e) {
            console.error(e);
        }
    }

    public async retrieveAllBuyers(response:any) {
        var query = this.model.find({});
        try {
        const buyerArray = await query.exec();
        response.json(buyerArray);
        }
        catch(e) {
            console.log(e);
        }
    }


    public async retrieveBuyersSub(response:any, value:number) {
        var query = this.model.findAll({subscriptionID: value});
        try {
            const result = await query.exec();
            response.json(result) ;
        }
        catch (e) {
            console.error(e);
        }
    }

    public async addToCart(response:any, value: number, id: string){
        var query = this.model.update({BuyerId: value}, {$push: {cart: id}})
        try {
            console.log("Adding to Cart...")
            const result = await query.exec();
            response.json(result) ;
            console.log("Added to Cart!")

        }
        catch (e) {
            console.error(e)
        }
    }

    }

export {BuyerModel};