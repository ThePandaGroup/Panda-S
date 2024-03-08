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
exports.SellerModel = void 0;
const Mongoose = require("mongoose");
class SellerModel {
    constructor(dbConnectionString) {
        this.dbConnectionString = dbConnectionString;
        this.createSchema();
        this.createModel();
    }
    createSchema() {
        this.schema = new Mongoose.Schema({
            sellerName: String,
            sellerId: String,
            sellerEmail: String,
            sellerPassword: String,
            subscriptionID: Number,
        }, { collection: "sellers" });
    }
    createModel() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Mongoose.connect(this.dbConnectionString);
                this.model = Mongoose.model("sellers", this.schema);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    retrieveSellerInfo(response, value) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = this.model.findOne({ "sellerId": value });
            try {
                const result = yield query.exec();
                response.json(result);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    retrieveAllSellers(response) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = this.model.find({});
            try {
                const sellerArray = yield query.exec();
                response.json(sellerArray);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
exports.SellerModel = SellerModel;
//# sourceMappingURL=SellerModel.js.map