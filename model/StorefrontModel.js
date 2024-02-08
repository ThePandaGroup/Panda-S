"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorefrontModel = void 0;
const Mongoose = require("mongoose");
class StorefrontModel {
    constructor(DB_CONNECTION_STRING) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }
    createSchema() {
        this.schema = new Mongoose.Schema({
            sellerID: String,
            storeID: String,
            invList: [String],
            salesHistory: [String],
        }, { collection: 'storefront' });
    }
    createModel() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Mongoose.connect(this.dbConnectionString);
                this.model = Mongoose.model("Storefront", this.schema);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    retrieveHistoryCount(response) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("retrieving History Sales Count ...");
            var query = this.model.invList.estimatedDocumentCount();
            try {
                const numberOfSoldShoes = yield query.exec();
                console.log("numberOfShoes: " + numberOfSoldShoes);
                response.json(numberOfSoldShoes);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    addShoeToInv(response, sellerId, shoeId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Adding Shoe to Inventory ...");
            var query = this.model.update({ SellerID: sellerId }, { $push: { invList: shoeId } });
            try {
                const result = yield query.exec();
                console.log(shoeId + "shoe added.");
                response.json(result);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
}
exports.StorefrontModel = StorefrontModel;
//# sourceMappingURL=StorefrontModel.js.map