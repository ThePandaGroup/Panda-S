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
const passport = require("passport");
const BuyerModel_1 = require("./model/BuyerModel");
//let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
let GoogleStrategy = require('passport-google-oauth20-with-people-api').Strategy;
// Creates a Passport configuration for Google
class GooglePassport {
    constructor() {
        this.clientId = process.env.OAUTH_ID;
        this.secretId = process.env.OAUTH_SECRET;
        passport.use(new GoogleStrategy({
            clientID: this.clientId,
            clientSecret: this.secretId,
            callbackURL: "https://panda-s.azurewebsites.net/auth/google/callback"
        }, (accessToken, refreshToken, profile, done) => {
            console.log("inside new password google strategy");
            process.nextTick(() => __awaiter(this, void 0, void 0, function* () {
                console.log('validating google profile:' + JSON.stringify(profile));
                console.log("userId:" + profile.id);
                console.log("displayName: " + profile.displayName);
                console.log("retrieve all of the profile info needed");
                //const username = profile.displayName;
                const DB_CONNECTION_STRING = process.env.DB_PROTOCOL + process.env.DB_USER + ':' + encodeURIComponent(process.env.DB_PASSWORD) + process.env.DB_INFO;
                const buyerModel = new BuyerModel_1.BuyerModel(DB_CONNECTION_STRING, null);
                yield buyerModel.createModel();
                buyerModel.createModel();
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
            }));
        }));
        passport.serializeUser(function (user, done) {
            done(null, user);
        });
        passport.deserializeUser(function (user, done) {
            done(null, user);
        });
    }
}
exports.default = GooglePassport;
//# sourceMappingURL=GooglePassport.js.map