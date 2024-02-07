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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var express = require("express");
var bodyParser = require("body-parser");
var BuyerModel_1 = require("./model/BuyerModel");
var SellerModel_1 = require("./model/SellerModel");
var ShoeModel_1 = require("./model/ShoeModel");
// Creates and configures an ExpressJS web server.
var App = /** @class */ (function () {
    //Run configuration methods on the Express instance.
    function App(mongoDBConnection) {
        this.expressApp = express();
        this.middleware();
        this.routes();
        this.Buyers = new BuyerModel_1.BuyerModel(mongoDBConnection);
        this.Sellers = new SellerModel_1.SellerModel(mongoDBConnection);
        this.Shoes = new ShoeModel_1.ShoeModel(mongoDBConnection);
    }
    // Configure Express middleware.
    App.prototype.middleware = function () {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
    };
    // Configure API endpoints.
    App.prototype.routes = function () {
        var _this = this;
        var router = express.Router();
        router.get('/app/shoes', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Query All Shoes');
                        return [4 /*yield*/, this.Shoes.retrieveAllShoes(res)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        router.get('/app/shoes/:shoeId', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Query Single Shoe");
                        id = Number(req.params.shoeId);
                        return [4 /*yield*/, this.Shoes.retrieveShoe(res, id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
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
        //   this.expressApp.use('/', router);
        //   this.expressApp.use('/app/json/', express.static(__dirname+'/app/json'));
        //   this.expressApp.use('/images', express.static(__dirname+'/img'));
        //   this.expressApp.use('/', express.static(__dirname+'/pages'));
    };
    return App;
}());
exports.App = App;
