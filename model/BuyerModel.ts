import * as Mongoose from "mongoose";
import {IBuyer} from '../interfaces/IBuyerModel';
import { log } from "console";
import { ShoeModel } from "./ShoeModel";

import findOrCreate from 'mongoose-findorcreate';



class BuyerModel {
    public schema:any;
    public model:any;
    public dbConnectionString:string;
    public shoes: ShoeModel;
    // (DB_CONNECTION_STRING:string, shoes:ShoeModel)
    public constructor(DB_CONNECTION_STRING:string, shoes:ShoeModel) {
        this.dbConnectionString = DB_CONNECTION_STRING;
        this.createSchema();
        this.createModel();

        this.addToCart = this.addToCart.bind(this);
        this.shoes = shoes;
    }

    public createSchema() {
        this.schema = new Mongoose.Schema(
            {
                buyerName: String,
                buyerId: String,
                buyerEmail: String,
                subscriptionID: Number,
                shippingAddr: String,
                orderHistory: [String],
                cart: [{shoeID: String, addedAt: Date}],
                // googleId: String,
            }, {collection: 'buyers'}
        );
    }

    public async createModel() {
        try {
            await Mongoose.connect(this.dbConnectionString);
            this.model = Mongoose.model<IBuyer>("buyers", this.schema);
        }
        catch (e) {
            console.error(e);
        }
    }

    public async retrieveAllBuyers(response:any) {
        var query = this.model.find({});
        try {
        const buyerArray = await query.exec();
        response.json(buyerArray);
        }
        catch(e) {
            console.log(e);
        }
    }

    public async retrieveBuyerInfo(response:any, value:any) {
        var query = this.model.findOne({"buyerId": value});
        try {
            const buyerInfo = await query.exec();
            response.json(buyerInfo) ;
        }
        catch (e) {
            console.error(e);
        }
    }

    public async retrieveBuyersSub(response:any, value:any) {
        var query = this.model.findAll({subscriptionID: value});
        try {
            const result = await query.exec();
            response.json(result) ;
        }
        catch (e) {
            console.log(e);
        }
    }

    public async retrieveBuyersCart(response:any, value:any) {
        var query = this.model.findOne({"buyerId": value});
        try {
            const buyerInfo = await query.exec();
            response.json(buyerInfo.cart) ;
        }
        catch (e) {
            console.log(e);
        }
    }

    public async addToCart(response:any, buyerId: string, shoeId: string){
        // Find the buyer and the shoe
        const buyer = await this.model.findOne({buyerId: buyerId});
        const shoe = await this.shoes.getShoe(shoeId);
    
        if (!buyer || !shoe) {
            return response.status(404).send('Buyer or Shoe not found');
        }
    
        if (shoe.shoeQuantity < 1) {
            return response.status(400).send('Shoe is out of stock');
        }
    
        // Decrease the shoe quantity and add it to the buyer's cart
        shoe.shoeQuantity -= 1;
        buyer.cart.push({shoeID: shoeId, addedAt: new Date()});
    
        await shoe.save();
        await buyer.save();

        response.json({ message: shoe.shoeName + ' added to ' + buyer.buyerName + '\'s cart' }); 
        try{
        this.scheduleRemovalFromCart(buyerId, shoeId);
        } catch(error) {
            log(error);
        }
    }

    private async scheduleRemovalFromCart(buyerId:string, shoeId:string){
        setTimeout(async() => {
            try{
                const buyerRefreshed = await this.model.findOne({buyerId: buyerId});
                const shoeRefreshed = await this.shoes.getShoe(shoeId);

                if (!buyerRefreshed || !shoeRefreshed) {
                    console.error('Buyer or Shoe not found during timeout');
                    return;
                }
                const index = buyerRefreshed.cart.findIndex(item => item.shoeID === shoeId);
                if (index > -1) {
                    buyerRefreshed.cart.splice(index, 1);
                    shoeRefreshed.shoeQuantity += 1;
        
                    await buyerRefreshed.save();
                    await shoeRefreshed.save();
                }
            } catch (error) {
                console.error('Error removing item from cart during timeout: ', error);
            }
        }, 5 * 60 * 1000);
    
    }


    public async removeFromCart(buyerId: string, shoeId: string) {
        console.log("Removing Shoe from Cart ...");
        try {
            // Find the buyer and the shoe
            const buyer = await this.model.findOne({buyerId: buyerId});
            const shoe = await this.shoes.getShoe(shoeId);
    
            if (!buyer || !shoe) {
                console.error('Buyer or Shoe not found');
                return;
            }
    
            // Find the shoe in the buyer's cart
            const index = buyer.cart.findIndex(item => item.shoeID === shoeId);
            if (index > -1) {
                // Remove the shoe from the cart and increase the shoe quantity
                buyer.cart.splice(index, 1);
                shoe.shoeQuantity += 1;
    
                // Save the changes
                await buyer.save();
                await shoe.save();
            }
    
            console.log("Removed from Cart!")
        } catch (e) {
            console.error(e);
        }
    }

}
    

export {BuyerModel};