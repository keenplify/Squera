import express, {json, urlencoded} from "express";
import { connect as ConnectMongoose, NativeError, mongo } from "mongoose";
import passport from "passport";
import dotenv from "dotenv";
import cors from "cors";
import { Strategy } from 'passport-http-bearer';

import mongooseConfig from "./configs/mongoose.config";
import APIV1 from "./api/v1";
import User from "./models/User";
import { UserInterface } from "./interfaces/User.interface";
import { serve, setup } from "swagger-ui-express";
import { swaggerDocument } from "./configs/swagger";

// CONFIG DOTENV
dotenv.config();


// CREATE SERVER
const app = express();

// USE BEARER-PASSPORT
app.use(passport.initialize());
app.use(passport.session());

passport.use(new Strategy(
    function(token, done) {
        User.findOne({ token: token }, (err:NativeError, user:UserInterface) => {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            return done(null, user, { scope: 'all' });
        });
    }
));

passport.serializeUser((user: UserInterface, done) => {
    done(undefined); 
});

// DECODE JSON BODY
app.use(json());
app.use(urlencoded({extended: true}));

// USE CORS
app.use(cors());

// CONFIG VERSIONING/ROUTING
app.use('/api/v1', APIV1);

// CONNECT TO MONGODB
ConnectMongoose(
    process.env.MONGO_URI,
    mongooseConfig,
    (err) => err
    ? console.log(err)
    : console.log("MongoDB connection successfully established!")
);

// START EXPRESS SERVER
app.listen( process.env.EXPRESS_PORT, () => {
    console.log( `Server started at http://localhost:${ process.env.EXPRESS_PORT }/api/v1` );
} );

// DOCUMENTATION
app.use("/api-docs", serve, setup(swaggerDocument, {explorer: true}))