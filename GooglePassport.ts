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


                process.nextTick(() => {
                    console.log('validating google profile:' + JSON.stringify(profile));
                    console.log("userId:" + profile.id);
                    console.log("displayName: " + profile.displayName);
                    console.log("retrieve all of the profile info needed");
                    //const username = profile.displayName;

                    return done(null, profile);
                }); 
            }
        ));

        // const dbUser = process.env.DB_USER;
        // const dbPassword = process.env.DB_PASSWORD;
        // const dbProtocol = process.env.DB_PROTOCOL;

        
        // const DB_CONNECTION_STRING = dbProtocol + dbUser + ':' + encodeURIComponent(dbPassword) + process.env.DB_INFO;
        // const buyerModelInstance = new BuyerModel(DB_CONNECTION_STRING, null);
   

        // passport.serializeUser(function(user, done) {
        //     done(null, user.id);
        // });

        // passport.deserializeUser(function(user, done) {
        //     buyerModelInstance.model.findById(user.id, function(err, user) {
        //         done(null, user);
        //     });
        // });


        passport.serializeUser(function(user, done) {
            done(null, user);
        });

        passport.deserializeUser(function(user, done) {

            done(null, user);
    
        });

        
    }
}
export default GooglePassport;