import * as Mongoose from "mongoose";
import {IBuyer} from '../interfaces/IBuyerModel';

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
                buyerID: String,
                buyerEmail: String,
                buyerPassword: String,
                subscriptionID: Number,
                shippingAddr: String,
                orderHistory: [String]
            }, {collection: 'Buyers'}
        );    
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString);
            this.model = Mongoose.model<IBuyer>("Buyers", this.schema);
        }
        catch (e) {
            console.error(e);
        }
    }

    public async retrieveBuyerInfo(response:any, value:number) {
        var query = this.model.findOne({BuyerId: value});
        try {
            const result = await query.exec();
            response.json(result) ;
        }
        catch (e) {
            console.error(e);
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
            const result = await query.exec();
            response.json(result) ;
        }
        catch (e) {
            console.error(e)
        }
    }

    }

export {BuyerModel};