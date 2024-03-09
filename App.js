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
const crypto = require("crypto");
const passport = require("passport");
const GooglePassport_1 = require("./GooglePassport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
// Creates and configures an ExpressJS web server.
class App {
    //Run configuration methods on the Express instance.
    constructor(mongoDBConnection) {
        this.googlePassportObj = new GooglePassport_1.default();
        this.expressApp = express();
        this.middleware();
        this.routes();
        this.Sellers = new SellerModel_1.SellerModel(mongoDBConnection);
        this.Shoes = new ShoeModel_1.ShoeModel(mongoDBConnection);
        this.Store = new StorefrontModel_1.StorefrontModel(mongoDBConnection);
        this.Buyers = new BuyerModel_1.BuyerModel(mongoDBConnection, this.Shoes);
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
        this.expressApp.use(session({ secret: 'panda-s genius', resave: true, saveUninitialized: false }));
        this.expressApp.use(cookieParser());
        this.expressApp.use(passport.initialize());
        this.expressApp.use(passport.session());
    }
    // Google Auth
    validateAuth(req, res, next) {
        if (req.isAuthenticated()) {
            console.log("user is authenticated");
            console.log(JSON.stringify(req.user));
            return next();
        }
        console.log("user is not authenticated");
        res.redirect('/');
    }
    // Configure API endpoints.
    routes() {
        let router = express.Router();
        router.get('/user', (req, res) => {
            res.send(req.user);
        });
        router.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile', 'profile'] }));
        router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/#/storefront/80299' }), (req, res) => {
            console.log("successfully authenticated user and returned to callback page.");
            // Access the user profile
            const userProfile = req.user;
            console.log(userProfile);
            // If the userProfile has a buyerId property, you can access it like this:
            const buyerId = userProfile.id;
            console.log(buyerId);
            // res.json(req.user.id);
            req.session.buyerId = userProfile.id;
            console.log("redirecting to /#/");
            //res.json({req.profile});
            res.redirect('/#/');
        });
        router.get('/app/login', (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (req.user) {
                const buyerId = req.user.id;
                console.log("sending");
                res.send(buyerId);
            }
            else {
                console.log("not sending");
                res.send(null);
            }
        }));
        router.get('/app/logout', (req, res) => {
            req.user = null;
            req.session.destroy(err => {
                if (err) {
                    console.log('Error : Failed to destroy the session during logout.', err);
                }
                res.redirect('/#/');
            });
        });
        // SHOES ROUTES
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
        // Query Shoe Count
        router.get('/app/shoes/count/total', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("Query Shoe Count");
            yield this.Shoes.retrieveShoeCount(res);
        }));
        // Add shoe to cart
        // router.post('/app/add-to-cart/:buyerId/:shoeId', async (req, res) => {
        //   let shoeId = req.params.shoeId;
        //   const buyerId = Number(req.params.buyerId);
        //   await this.Buyers.addToCart(res, buyerId, shoeId);
        // });
        // BUYER ROUTE
        // Query All Buyers
        router.get('/app/buyers', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('Query All Buyers');
            yield this.Buyers.retrieveAllBuyers(res);
        }));
        // Query A Buyer Info
        router.get('/app/buyers/:buyerId', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("Query Buyer Info");
            const id = Number(req.params.buyerId);
            yield this.Buyers.retrieveBuyerInfo(res, id);
        }));
        // Query A Buyer's Cart
        router.get('/app/buyers/:buyerId/cart', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.buyerId);
            console.log("Query Buyer's Cart with id: " + id);
            yield this.Buyers.retrieveBuyersCart(res, id);
        }));
        // Add to Buyer's Cart
        // router.post('/app/buyers/:buyerId/cart/:shoeId', async (req, res) => {
        //   let shoeId = req.params.shoeId;
        //   const buyerId = Number(req.params.buyerId);
        //   try {
        //       await this.Buyers.addToCart(res, buyerId, shoeId);
        //       console.log("Added to cart");
        //   } catch(err) {
        //       console.log(`Error in adding an Item to the cart ${err}`);
        //   };
        // })
        router.post('/app/buyers/cart/:shoeId', this.validateAuth, (req, res) => __awaiter(this, void 0, void 0, function* () {
            let shoeId = req.params.shoeId;
            const buyerId = req.user.id; // Use req.user.id instead of req.params.buyerId
            try {
                yield this.Buyers.addToCart(res, Number(buyerId), shoeId);
                console.log("Added to cart");
            }
            catch (err) {
                console.log(`Error in adding an Item to the cart ${err}`);
            }
            ;
        }));
        // router.post('/app/buyers/:buyerId/cart/:shoeId', this.validateAuth, async (req: RequestWithUser, res) => {
        //   let shoeId = req.params.shoeId;
        //   const buyerId = Number(req.params.buyerId);
        //   if (req.user.id !== String(buyerId)) {
        //     return res.status(403).send('Unauthorized');
        //   }
        //   try {
        //       await this.Buyers.addToCart(res, buyerId, shoeId);
        //       console.log("Added to cart");
        //   } catch(err) {
        //       console.log(`Error in adding an Item to the cart ${err}`);
        //   };
        // })
        router.post('/app/buyers/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("Adding a New Buyer");
            const id = crypto.randomBytes(16).toString("hex");
            console.log(req.body);
            var jsonObj = req.body;
            jsonObj.userId = id;
            const doc = new this.Buyers.model(jsonObj);
            try {
                yield doc.save();
                res.send('Buyer created successfully-id: ' + id);
            }
            catch (e) {
                console.log(e);
            }
        }));
        // SELLER ROUTE
        // Query All Sellers
        router.get('/app/sellers', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('Query All Sellers');
            yield this.Sellers.retrieveAllSellers(res);
        }));
        // Query a Seller Info
        router.get('/app/sellers/:sellerId', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("Query Seller Info");
            const id = Number(req.params.sellerId);
            yield this.Sellers.retrieveSellerInfo(res, id);
        }));
        router.post('/app/sellers/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("Adding a New Seller");
            const id = crypto.randomBytes(16).toString("hex");
            console.log(req.body);
            var jsonObj = req.body;
            jsonObj.userId = id;
            const doc = new this.Sellers.model(jsonObj);
            try {
                yield doc.save();
                res.send('Seller created successfully-id: ' + id);
            }
            catch (e) {
                console.log(e);
            }
        }));
        // STOREFRONT ROUTE
        // Query All Storefront
        router.get('/app/storefronts', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('Query All Storefront');
            yield this.Store.retrieveAllStorefronts(res);
        }));
        // Query A Storefront
        router.get('/app/storefronts/:storeId', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("Query Single Storefront");
            const id = Number(req.params.storeId);
            yield this.Store.retrieveStorefront(res, id);
        }));
        // Query A Storefront's Inventory
        router.get('/app/storefronts/:storeId/inventory', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.storeId);
            console.log("Query Storefront's Inventory with id: " + id);
            yield this.Store.retrieveStorefrontsInv(res, id);
        }));
        // Query A Storefront's Inventory Count
        router.get('/app/storefronts/:storeId/inventory/count', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.storeId);
            console.log("Query Storefront's Inventory count with id: " + id);
            yield this.Store.retrieveInvCount(res, id);
        }));
        // Add Shoe to Storefront's Inventory
        router.post('/app/storefronts/:storeId/inventory/add/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("Adding a New Shoe");
            let storeId = Number(req.params.storeId);
            const id = crypto.randomBytes(16).toString("hex");
            console.log(req.body);
            var jsonObj = req.body;
            const doc = new this.Shoes.model(jsonObj);
            try {
                yield doc.save();
                yield this.Store.addShoeToInv(res, storeId, jsonObj.shoeId);
                res.send();
            }
            catch (e) {
                console.log(e);
            }
        }));
        this.expressApp.use('/', router);
        this.expressApp.use('/app/json/', express.static(__dirname + '/app/json'));
        this.expressApp.use('/assets', express.static(__dirname + '/pages'));
        //this.expressApp.use('/', express.static(__dirname+'/pages'));
        this.expressApp.use('/', express.static(__dirname + '/dist/panda-s/browser'));
    }
}
exports.App = App;
//# sourceMappingURL=App.js.map