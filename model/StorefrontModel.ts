import * as Mongoose from "mongoose";
import {IStorefront} from '../interfaces/IStorefrontModel';

class ShoeModel {
  public schema:any;
  public model:any;
  public dbConnectionString:string;

  public constructor(DB_CONNECTION_STRING:string) {
    this.dbConnectionString = DB_CONNECTION_STRING;
    this.createSchema()
    this.createModel();
  }

  public createSchema() {
    this.schema = new Mongoose.Schema(
      {
        sellerID: Number,
        storeID: Number,
        invList: [{ type: Number }],
        salesHistory: [{ type: Number }],
        storePic: Buffer
      }, {collection: 'shoes'}
    );
  }

  public async createModel() {
    try {
      await Mongoose.connect(this.dbConnectionString);
      this.model = Mongoose.model<IStorefront>("Storefront", this.schema);
    }
    catch (e) {
        console.error(e);
    }
  }
}

export {ShoeModel};