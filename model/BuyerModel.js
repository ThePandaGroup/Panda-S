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
const console_1 = require("console");
class BuyerModel {
    // (DB_CONNECTION_STRING:string, shoes:ShoeModel)
    constructor(DB_CONNECTION_STRING, shoes) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();
        this.addToCart = this.addToCart.bind(this);
        this.shoes = shoes;
    }
    createSchema() {
        this.schema = new Mongoose.Schema({
            buyerName: String,
            buyerId: String,
            buyerEmail: String,
            buyerPassword: String,
            subscriptionID: Number,
            shippingAddr: String,
            orderHistory: [String],
            cart: [{ shoeID: String, addedAt: Date }],
            googleId: String,
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
    retrieveBuyerInfo(response, value) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = this.model.findOne({ "buyerId": value });
            try {
                const buyerInfo = yield query.exec();
                response.json(buyerInfo);
            }
            catch (e) {
                console.error(e);
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
                console.log(e);
            }
        });
    }
    retrieveBuyersCart(response, value) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = this.model.findOne({ "buyerId": value });
            try {
                const buyerInfo = yield query.exec();
                response.json(buyerInfo.cart);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    addToCart(response, buyerId, shoeId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Find the buyer and the shoe
            const buyer = yield this.model.findOne({ buyerId: buyerId });
            const shoe = yield this.shoes.getShoe(shoeId);
            if (!buyer || !shoe) {
                return response.status(404).send('Buyer or Shoe not found');
            }
            if (shoe.shoeQuantity < 1) {
                return response.status(400).send('Shoe is out of stock');
            }
            // Decrease the shoe quantity and add it to the buyer's cart
            shoe.shoeQuantity -= 1;
            buyer.cart.push({ shoeID: shoeId, addedAt: new Date() });
            yield shoe.save();
            yield buyer.save();
            response.json({ message: shoe.shoeName + ' added to ' + buyer.buyerName + '\'s cart' });
            try {
                this.scheduleRemovalFromCart(buyerId, shoeId);
            }
            catch (error) {
                (0, console_1.log)(error);
            }
        });
    }
    scheduleRemovalFromCart(buyerId, shoeId) {
        return __awaiter(this, void 0, void 0, function* () {
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                try {
                    const buyerRefreshed = yield this.model.findOne({ buyerId: buyerId });
                    const shoeRefreshed = yield this.shoes.getShoe(shoeId);
                    if (!buyerRefreshed || !shoeRefreshed) {
                        console.error('Buyer or Shoe not found during timeout');
                        return;
                    }
                    const index = buyerRefreshed.cart.findIndex(item => item.shoeID === shoeId);
                    if (index > -1) {
                        buyerRefreshed.cart.splice(index, 1);
                        shoeRefreshed.shoeQuantity += 1;
                        yield buyerRefreshed.save();
                        yield shoeRefreshed.save();
                    }
                }
                catch (error) {
                    console.error('Error removing item from cart during timeout: ', error);
                }
            }), 45000);
        });
    }
}
exports.BuyerModel = BuyerModel;
//# sourceMappingURL=BuyerModel.js.map