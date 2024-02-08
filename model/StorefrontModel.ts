import * as Mongoose from "mongoose";
import {IStorefront} from '../interfaces/IStorefrontModel';

class StorefrontModel {
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
        sellerID: String,
        storeID: String,
        invList: [String],
        salesHistory: [String],
      }, {collection: 'storefront'}
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
  public async retrieveHistoryCount(response:any) {
    console.log("retrieving History Sales Count ...");
    var query = this.model.invList.estimatedDocumentCount();
    try {
      const numberOfSoldShoes = await query.exec();
      console.log("numberOfShoes: " + numberOfSoldShoes);
      response.json(numberOfSoldShoes);
    }
    catch (e) {
        console.error(e);
    }
  }

  public async addShoeToInv(response:any, sellerId: number, shoeId: number) {
    console.log("Adding Shoe to Inventory ...");
    var query = this.model.update({SellerID: sellerId}, {$push:{invList: shoeId}});
    try {
      const result = await query.exec();
      console.log(shoeId + "shoe added.");
      response.json(result);
    }
    catch (e) {
        console.error(e);
    }
  }

}

export {StorefrontModel};