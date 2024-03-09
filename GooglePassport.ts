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

                BuyerModel.findOneAndUpdate(
                    { googleId: profile.id }, // Find a document with this Google ID.
                    {
                        buyerName: profile.displayName,
                        buyerEmail: profile.emails[0].value,
                        googleId: profile.id,
                        // Set other fields as needed.
                    },
                    { upsert: true, new: true, setDefaultsOnInsert: true }, // Options for creating if not found.
                    (err, buyer) => {
                        return done(err, buyer);
                    }
                );


                process.nextTick(async () => {
                    console.log('validating google profile:' + JSON.stringify(profile));
                    console.log("userId:" + profile.id);
                    console.log("displayName: " + profile.displayName);
                    console.log("retrieve all of the profile info needed");
                    //const username = profile.displayName;

                    return done(null, profile);
                }); 
            }
        ));

        passport.serializeUser(function(user, done) {
            done(null, user);
        });

        // passport.deserializeUser(function(user, done) {
        //     done(null, user);
        // });

        passport.deserializeUser(async (id, done) => {
            try {
                const user = await BuyerModel.findById(id);
                done(null, user);
            } catch (err) {
                done(err, null);
            }
        });


        
    }
}
export default GooglePassport;