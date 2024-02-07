import * as Mongoose from "mongoose";
import {IShoe} from '../interfaces/IShoeModel';

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
        shoeName: String,
        shoeDescription: String,
        shoeId: Number,
        shoeSize: Number,
        shoeRating: Number,
        sellerId: Number,
        shoePrice: Number
      }, {collection: 'shoes'}
    );
  }

  public async createModel() {
    try {
      await Mongoose.connect(this.dbConnectionString);
      this.model = Mongoose.model<IShoe>("Shoes", this.schema);
    }
    catch (e) {
        console.error(e);
    }
  }

  public async retrieveAllShoes(response:any) {
    var query = this.model.find({});
    try {
      const shoesArray = await query.exec();
      response.json(shoesArray);
    }
    catch(e) {
        console.log(e);
    }
  }

  public async retrieveShoe(response:any, value:number) {
    var query = this.model.findOne({"shoeId": value});
    try {
      const result = await query.exec();
      response.json(result) ;
    }
    catch (e) {
      console.log(e);
    }
  }

  public async retrieveShoeCount(response:any) {
    console.log("retrieve Shoe Count ...");
    var query = this.model.estimatedDocumentCount();
    try {
      const numberOfShoes = await query.exec();
      console.log("numberOfShoes: " + numberOfShoes);
      response.json(numberOfShoes);
    }
    catch (e) {
        console.error(e);
    }
  }
}

export {ShoeModel};