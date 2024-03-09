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
                return done(null, profile);
            }));
        }));
        const dbUser = process.env.DB_USER;
        const dbPassword = process.env.DB_PASSWORD;
        const dbProtocol = process.env.DB_PROTOCOL;
        const DB_CONNECTION_STRING = dbProtocol + dbUser + ':' + encodeURIComponent(dbPassword) + process.env.DB_INFO;
        const buyerModelInstance = new BuyerModel_1.BuyerModel(DB_CONNECTION_STRING, null);
        passport.serializeUser(function (user, done) {
            done(null, user.id);
        });
        passport.deserializeUser(function (user, done) {
            buyerModelInstance.model.findById(user.id, function (err, user) {
                done(null, user);
            });
        });
    }
}
exports.default = GooglePassport;
//# sourceMappingURL=GooglePassport.js.map