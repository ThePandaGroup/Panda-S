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
exports.App = void 0;
const express = require("express");
const bodyParser = require("body-parser");
const BuyerModel_1 = require("./model/BuyerModel");
const SellerModel_1 = require("./model/SellerModel");
const ShoeModel_1 = require("./model/ShoeModel");
const StorefrontModel_1 = require("./model/StorefrontModel");
// Creates and configures an ExpressJS web server.
class App {
    //Run configuration methods on the Express instance.
    constructor(mongoDBConnection) {
        this.expressApp = express();
        this.middleware();
        this.routes();
        this.Buyers = new BuyerModel_1.BuyerModel(mongoDBConnection);
        this.Sellers = new SellerModel_1.SellerModel(mongoDBConnection);
        this.Shoes = new ShoeModel_1.ShoeModel(mongoDBConnection);
        this.Store = new StorefrontModel_1.StorefrontModel(mongoDBConnection);
    }
    // Configure Express middleware.
    middleware() {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
    }
    // Configure API endpoints.
    routes() {
        let router = express.Router();
        // Query All Shoes
        router.get('/app/shoes', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('Query All Shoes');
            yield this.Shoes.retrieveAllShoes(res);
        }));
        // Query A Single Shoes
        router.get('/app/shoes/:shoeId', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("Query Single Shoe");
            const id = Number(req.params.shoeId);
            yield this.Shoes.retrieveShoe(res, id);
        }));
        // Query A Buyer Info
        router.get('/app/buyers/:buyerId', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("Query Buyer Info");
            const id = Number(req.params.buyerId);
            yield this.Buyers.retrieveBuyerInfo(res, id);
        }));
        // Query All Buyers
        router.get('/app/buyers', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('Query All Buyers');
            yield this.Buyers.retrieveAllBuyers(res);
        }));
        // Query a Seller Info
        router.get('/app/sellers/:sellerId', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("Query Seller Info");
            const id = Number(req.params.sellerId);
            yield this.Sellers.retrieveSellerInfo(res, id);
        }));
        // Query All Sellers
        router.get('/app/sellers', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('Query All Sellers');
            yield this.Sellers.retrieveAllSellers(res);
        }));
        //   router.get('/app/list/:listId/count', async (req, res) => {
        //       var id = req.params.listId;
        //       console.log('Query single list with id: ' + id);
        //       await this.Tasks.retrieveTasksCount(res, {listId: id});
        //   });
        //   router.get('/app/list/:listId', async (req, res) => {
        //     var id = req.params.listId;
        //     console.log('Query single list with id: ' + id);
        //     await this.Lists.retrieveLists(res, id);
        //   });
        //   router.post('/app/list/', async (req, res) => {
        //     const id = crypto.randomBytes(16).toString("hex");
        //     console.log(req.body);
        //       var jsonObj = req.body;
        //       jsonObj.listId = id;
        //       try {
        //         await this.Lists.model.create([jsonObj]);
        //         res.send('{"id":"' + id + '"}');
        //       }
        //       catch (e) {
        //         console.error(e);
        //         console.log('object creation failed');
        //       }
        //   });
        //   router.post('/app/list2/', async (req, res) => {
        //     const id = crypto.randomBytes(16).toString("hex");
        //     console.log(req.body);
        //       var jsonObj = req.body;
        //       jsonObj.listId = id;
        //       const doc = new this.Lists.model(jsonObj);
        //       try {
        //         await doc.save();
        //         res.send('{"id":"' + id + '"}');
        //       }
        //       catch (e) {
        //         console.log('object creation failed');
        //         console.error(e);
        //       }        
        //   });
        //   router.get('/app/list/:listId', async (req, res) => {
        //       var id = req.params.listId;
        //       console.log('Query single list with id: ' + id);
        //       await this.Tasks.retrieveTasksDetails(res, {listId: id});
        //   });
        //   router.get('/app/list/', async (req, res) => {
        //       console.log('Query All list');
        //       await this.Lists.retrieveAllLists(res);
        //   });
        //   router.get('/app/listcount', async (req, res) => {
        //     console.log('Query the number of list elements in db');
        //     await this.Lists.retrieveListCount(res);
        //   });
        this.expressApp.use('/', router);
        //   this.expressApp.use('/app/json/', express.static(__dirname+'/app/json'));
        //   this.expressApp.use('/images', express.static(__dirname+'/img'));
        this.expressApp.use('/', express.static(__dirname + '/pages'));
    }
}
exports.App = App;
//# sourceMappingURL=App.js.map