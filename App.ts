import * as express from 'express';
import * as bodyParser from 'body-parser';
import {BuyerModel} from './model/BuyerModel';
import {SellerModel} from './model/SellerModel';
import {ShoeModel} from './model/ShoeModel';
import {StorefrontModel} from './model/StorefrontModel';
import * as crypto from 'crypto';

import * as passport from 'passport';
import GooglePassportObj from './GooglePassport';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';

import { Request } from 'express';

// interface RequestWithUser extends Request {
//   user: any; // Or use a more specific type if you know the structure of your user object
// }

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public expressApp: express.Application;
  public Buyers:BuyerModel;
  public Sellers:SellerModel;
  public Shoes:ShoeModel;
  public Store:StorefrontModel;

  public googlePassportObj:GooglePassportObj;

  //Run configuration methods on the Express instance.
  constructor(mongoDBConnection:string)
  {

    this.googlePassportObj = new GooglePassportObj();

    this.expressApp = express();
    this.middleware();
    this.routes();
  
    this.Sellers = new SellerModel(mongoDBConnection);
    this.Shoes = new ShoeModel(mongoDBConnection);
    this.Store = new StorefrontModel(mongoDBConnection);

    this.Buyers = new BuyerModel(mongoDBConnection, this.Shoes);
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

    this.expressApp.use(session({ secret: 'keyboard cat' }));
    this.expressApp.use(cookieParser());
    this.expressApp.use(passport.initialize());
    this.expressApp.use(passport.session());
  }

  // Google Auth
  private validateAuth(req, res, next):void {
    if (req.isAuthenticated()) { 
      console.log("user is authenticated"); 
      console.log(JSON.stringify(req.user));
      return next(); }
    console.log("user is not authenticated");
    res.redirect('/');
  }

  private isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
  }


  

  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();


    router.get('/auth/google', 
    passport.authenticate('google', {scope: ['profile']}));


    router.get('/auth/google/callback', 
    passport.authenticate('google', 
      { failureRedirect: '/' }
    ),
    (req, res) => {
      console.log("successfully authenticated user and returned to callback page.");
      console.log("redirecting to /#/list");
      res.redirect('/#/');
    }
  );


  // router.get('/api/user', async (req: RequestWithUser, res) => {
  //   if (req.user) {
  //     const buyerId = req.user.buyerId; 
  //     res.send(buyerId);
  //   } else {
  //     res.send(null);
  //   }
  // });

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

    // Query Shoe Count
    router.get('/app/shoes/count/total', async (req, res) => {
      console.log("Query Shoe Count");
      await this.Shoes.retrieveShoeCount(res);
    });

    // Add shoe to cart
    // router.post('/app/add-to-cart/:buyerId/:shoeId', async (req, res) => {
    //   let shoeId = req.params.shoeId;
    //   const buyerId = Number(req.params.buyerId);
    //   await this.Buyers.addToCart(res, buyerId, shoeId);
    // });


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
    router.get('/app/buyers/:buyerId/cart', this.isLoggedIn,async (req, res) => {
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
          console.log("Added to cart");
      } catch(err) {
          console.log(`Error in adding an Item to the cart ${err}`);
      };
    })

    router.post('/app/buyers/', async (req, res) => {
      console.log("Adding a New Buyer");
      const id = crypto.randomBytes(16).toString("hex");
      console.log(req.body);
      var jsonObj = req.body;
      jsonObj.userId = id;
      const doc = new this.Buyers.model(jsonObj);
      try {
        await doc.save();
        res.send('Buyer created successfully-id: ' + id);
      }
      catch (e) {
        console.log(e);
      }
    });

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

    router.post('/app/sellers/', async (req, res) => {
      console.log("Adding a New Seller");
      const id = crypto.randomBytes(16).toString("hex");
      console.log(req.body);
      var jsonObj = req.body;
      jsonObj.userId = id;
      const doc = new this.Sellers.model(jsonObj);
      try {
        await doc.save();
        res.send('Seller created successfully-id: ' + id);
      }
      catch (e) {
        console.log(e);
      }
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
    router.post('/app/storefronts/:storeId/inventory/add/', async (req, res) => {
      console.log("Adding a New Shoe");
      let storeId = Number(req.params.storeId);
      const id = crypto.randomBytes(16).toString("hex");
      console.log(req.body);
      var jsonObj = req.body;
      const doc = new this.Shoes.model(jsonObj);
      try {
          await doc.save();
          await this.Store.addShoeToInv(res, storeId, jsonObj.shoeId);
          res.send();
      }
      catch (e) {
          console.log(e);
      }
    });


  
  this.expressApp.use('/', router);

  this.expressApp.use('/app/json/', express.static(__dirname+'/app/json'));
  this.expressApp.use('/assets', express.static(__dirname+'/pages'));
  //this.expressApp.use('/', express.static(__dirname+'/pages'));
  this.expressApp.use('/', express.static(__dirname+'/dist/panda-s/browser'));
  }
}

export {App};