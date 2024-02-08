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
exports.BuyerModel = void 0;
const Mongoose = require("mongoose");
class BuyerModel {
    constructor(DB_CONNECTION_STRING) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
    }
    createSchema() {
        this.schema = new Mongoose.Schema({
            buyerName: String,
            buyerId: String,
            buyerEmail: String,
            buyerPassword: String,
            subscriptionID: Number,
            shippingAddr: String,
            orderHistory: [String]
        }, { collection: 'buyers' });
    }
    createModel() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Mongoose.connect(this.dbConnectionString);
                this.model = Mongoose.model("buyers", this.schema);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    retrieveBuyerInfo(response, value) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = this.model.findOne({ "buyerId": value });
            try {
                const result = yield query.exec();
                response.json(result);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    retrieveAllBuyers(response) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = this.model.find({});
            try {
                const buyerArray = yield query.exec();
                response.json(buyerArray);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    retrieveBuyersSub(response, value) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = this.model.findAll({ subscriptionID: value });
            try {
                const result = yield query.exec();
                response.json(result);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    addToCart(response, value, id) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = this.model.update({ BuyerId: value }, { $push: { cart: id } });
            try {
                console.log("Adding to Cart...");
                const result = yield query.exec();
                response.json(result);
                console.log("Added to Cart!");
            }
            catch (e) {
                console.error(e);
            }
        });
    }
}
exports.BuyerModel = BuyerModel;
//# sourceMappingURL=BuyerModel.js.map