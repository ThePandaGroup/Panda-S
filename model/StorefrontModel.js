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
            sellerId: String,
            storeId: String,
            invList: [String],
            salesHistory: [String],
            storePic: String,
        }, { collection: 'storefront' });
    }
    createModel() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Mongoose.connect(this.dbConnectionString);
                this.model = Mongoose.model("storefront", this.schema);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    retrieveAllStorefronts(response) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = this.model.find({});
            try {
                const storefrontArray = yield query.exec();
                response.json(storefrontArray);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    retrieveStorefront(response, value) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = this.model.findOne({ "storeId": value });
            try {
                const result = yield query.exec();
                response.json(result);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    retrieveInvCount(response, storeId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("retrieving History Sales Count ...");
            const store = yield this.model.findOne({ storeId: storeId });
            try {
                if (!store) {
                    console.log("No store found with this ID");
                }
                else {
                    const numberOfShoes = store.invList.length;
                    response.json(numberOfShoes);
                }
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    retrieveStorefrontsInv(response, value) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = this.model.findOne({ "storeId": value });
            try {
                let storeInfo = yield query.exec();
                response.json(storeInfo.invList);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    addShoeToInv(response, sellerId, shoeId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Adding Shoe to Inventory ...");
            var query = this.model.updateOne({ storeId: sellerId }, { $push: { invList: shoeId } });
            try {
                console.log("Adding to Inventory...");
                const result = yield query.exec();
                response.json(result);
                console.log("Added to Inventory!");
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
exports.StorefrontModel = StorefrontModel;
//# sourceMappingURL=StorefrontModel.js.map