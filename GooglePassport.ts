import * as passport from 'passport';
import * as dotenv from 'dotenv';
import { BuyerModel } from './model/BuyerModel';

//let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
let GoogleStrategy = require('passport-google-oauth20-with-people-api').Strategy;

// Creates a Passport configuration for Google
class GooglePassport {

    clientId: string;
    secretId: string;
     
    constructor() {
        this.clientId = process.env.OAUTH_ID;
        this.secretId = process.env.OAUTH_SECRET;

        passport.use(new GoogleStrategy({
                clientID: this.clientId,
                clientSecret: this.secretId,
                callbackURL: "https://panda-s.azurewebsites.net/auth/google/callback"
            },
            (accessToken, refreshToken, profile, done) => {
                console.log("inside new password google strategy");
                process.nextTick( () => {
                    console.log('validating google profile:' + JSON.stringify(profile));
                    console.log("userId:" + profile.id);
                    console.log("displayName: " + profile.displayName);
                    console.log("retrieve all of the profile info needed");
                    //const username = profile.displayName;

                    const DB_CONNECTION_STRING = process.env.DB_PROTOCOL + process.env.DB_USER + ':' + encodeURIComponent(process.env.DB_PASSWORD) + process.env.DB_INFO;

                    const buyerModel = new BuyerModel(DB_CONNECTION_STRING);


                    buyerModel.model.findOne({ buyerId: profile.id }, (err, buyer) => {
                        if (err) {
                            return done(err);
                        }
                        if (!buyer) {
                            // If the buyer isn't found in your database, handle it as you see fit.
                            // You could create a new buyer, or return an error
                            return done(null, false, { message: 'Buyer not found' });
                        }
                        // If the buyer is found, return it
                        return done(null, buyer);
                    });


                    return done(null, profile);
                }); 
            }
        ));

        passport.serializeUser(function(user, done) {
            done(null, user);
        });

        passport.deserializeUser(function(user, done) {
            done(null, user);
        });


        
    }
}
export default GooglePassport;