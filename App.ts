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

    // STOREFRONT ROUTE

    // Query All Storefront
    router.get('/app/storefronts', async (req, res) => {
      console.log('Query All Storefront');
      await this.Store.retrieveAllStorefronts(res);
    });

    // Query A Storefront
    router.get('/app/storefronts/:storeId', async (req, res) => {
      console.log("Query Single Storefront");
      const id = Number(req.params.storeId);
      await this.Store.retrieveStorefront(res, id);
    });

    // Query A Storefront's Inventory
    router.get('/app/storefronts/:storeId/inventory', async (req, res) => {
      const id = Number(req.params.storeId);
      console.log("Query Storefront's Inventory with id: " + id);
      await this.Store.retrieveStorefrontsInv(res, id);
    });

    // Query A Storefront's Inventory Count
    router.get('/app/storefronts/:storeId/inventory/count', async (req, res) => {
      const id = Number(req.params.storeId);
      console.log("Query Storefront's Inventory count with id: " + id);
      await this.Store.retrieveInvCount(res, id);
    });

    // Add Shoe to Storefront's Inventory
    router.post('/app/storefronts/:storeId/inventory/:shoeId', async (req, res) => {
      let shoeId = req.params.shoeId;
      const storeId = Number(req.params.storeId);
      try {
          await this.Store.addShoeToInv(res, storeId, shoeId);
      } catch(err) {
          console.log(`Error in adding an Item to the inventory ${err}`);
      };
    })


  this.expressApp.use('/', router);

  //   this.expressApp.use('/app/json/', express.static(__dirname+'/app/json'));
  //   this.expressApp.use('/images', express.static(__dirname+'/img'));
  this.expressApp.use('/', express.static(__dirname+'/pages'));
    
  }

}

export {App};