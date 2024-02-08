import * as express from 'express';
import * as bodyParser from 'body-parser';
import {BuyerModel} from './model/BuyerModel';
import {SellerModel} from './model/SellerModel';
import {ShoeModel} from './model/ShoeModel';
import {StorefrontModel} from './model/StorefrontModel';
import * as crypto from 'crypto';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public expressApp: express.Application;
  public Buyers:BuyerModel;
  public Sellers:SellerModel;
  public Shoes:ShoeModel;
  public Store:StorefrontModel;

  //Run configuration methods on the Express instance.
  constructor(mongoDBConnection:string)
  {
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.Buyers = new BuyerModel(mongoDBConnection);
    this.Sellers = new SellerModel(mongoDBConnection);
    this.Shoes = new ShoeModel(mongoDBConnection);
    this.Store = new StorefrontModel(mongoDBConnection);
  }

  // Configure Express middleware.
  private middleware(): void {
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    this.expressApp.use( (req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
  }

  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();

    // SHOES ROUTES

    // Query All Shoes
    router.get('/app/shoes', async (req, res) => {
      console.log('Query All Shoes');
      await this.Shoes.retrieveAllShoes(res);
    });

    // Query A Single Shoes
    router.get('/app/shoes/:shoeId', async (req, res) => {
      console.log("Query Single Shoe");
      const id = Number(req.params.shoeId);
      await this.Shoes.retrieveShoe(res, id);
    });

    // BUYER ROUTE

    // Query All Buyers
    router.get('/app/buyers', async (req, res) => {
      console.log('Query All Buyers');
      await this.Buyers.retrieveAllBuyers(res);
    });

    // Query A Buyer Info
    router.get('/app/buyers/:buyerId', async (req, res) => {
      console.log("Query Buyer Info");
      const id = Number(req.params.buyerId);
      await this.Buyers.retrieveBuyerInfo(res, id);
    });

    // Query A Buyer's Cart
    router.get('/app/buyers/:buyerId/cart', async (req, res) => {
      const id = Number(req.params.buyerId);
      console.log("Query Buyer's Cart with id: " + id);
      await this.Buyers.retrieveBuyersCart(res, id);
    });

    // Add to Buyer's Cart
    router.post('/app/buyers/:buyerId/cart/:shoeId', async (req, res) => {
      let shoeId = req.params.shoeId;
      const buyerId = Number(req.params.buyerId);
      try {
          await this.Buyers.addToCart(res, buyerId, shoeId);
      } catch(err) {
          console.log(`Error in adding an Item to the cart ${err}`);
      };
    })

    // SELLER ROUTE

    // Query All Sellers
    router.get('/app/sellers', async (req, res) => {
      console.log('Query All Sellers');
      await this.Sellers.retrieveAllSellers(res);
    });

    // Query a Seller Info
    router.get('/app/sellers/:sellerId', async (req, res) => {
      console.log("Query Seller Info");
      const id = Number(req.params.sellerId);

      await this.Sellers.retrieveSellerInfo(res, id);
    });



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
  this.expressApp.use('/', express.static(__dirname+'/pages'));
    
  }

}

export {App};