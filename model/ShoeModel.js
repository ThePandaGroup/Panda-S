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
exports.ShoeModel = void 0;
const Mongoose = require("mongoose");
class ShoeModel {
    constructor(DB_CONNECTION_STRING) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }
    createSchema() {
        this.schema = new Mongoose.Schema({
            shoeName: String,
            shoeDescription: String,
            shoeId: String,
            shoeSize: Number,
            shoeRating: Number,
            storeId: String,
            shoePrice: Number
        }, { collection: 'shoes' });
    }
    createModel() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Mongoose.connect(this.dbConnectionString);
                this.model = Mongoose.model("shoes", this.schema);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    retrieveAllShoes(response) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = this.model.find({});
            try {
                const shoesArray = yield query.exec();
                response.json(shoesArray);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    retrieveShoe(response, value) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = this.model.findOne({ "shoeId": value });
            try {
                const result = yield query.exec();
                response.json(result);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    retrieveShoeCount(response) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("retrieve Shoe Count ...");
            var query = this.model.estimatedDocumentCount();
            try {
                const numberOfShoes = yield query.exec();
                console.log("numberOfShoes: " + numberOfShoes);
                response.json(numberOfShoes);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
}
exports.ShoeModel = ShoeModel;
//# sourceMappingURL=ShoeModel.js.map