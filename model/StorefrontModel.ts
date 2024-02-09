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
        sellerId: String,
        storeId: String,
        invList: [String],
        salesHistory: [String],
        storePic: String,
      }, {collection: 'storefront'}
    );
  }

  public async createModel() {
    try {
      await Mongoose.connect(this.dbConnectionString);
      this.model = Mongoose.model<IStorefront>("storefront", this.schema);
    }
    catch (e) {
        console.error(e);
    }
  }

  public async retrieveAllStorefronts(response:any) {
    var query = this.model.find({});
    try {
      const storefrontArray = await query.exec();
      response.json(storefrontArray);
    }
    catch(e) {
      console.log(e);
    }
  }

  public async retrieveStorefront(response:any, value:number) {
    var query = this.model.findOne({"storeId":value});
    try {
      const result = await query.exec();
      response.json(result);
    }
    catch (e) {
      console.log(e);
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
        console.log(e);
    }
  }

  public async retrieveStorefrontsInv(response:any, value:number) {
    var query = this.model.findOne({"storeId": value});
    try {
        let storeInfo = await query.exec();
        response.json(storeInfo.invList);
    }
    catch (e) {
        console.log(e);
    }
  }

  public async addShoeToInv(response:any, sellerId: number, shoeId: string) {
    console.log("Adding Shoe to Inventory ...");
    var query = this.model.updateOne({storeId: sellerId}, {$push:{invList: shoeId}});
    try {
      console.log("Adding to Inventory...")
      const result = await query.exec();
      response.json(result);
      console.log("Added to Inventory!")
    }
    catch (e) {
        console.log(e);
    }
  }

}

export {StorefrontModel};