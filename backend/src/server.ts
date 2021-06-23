import express, {json, urlencoded} from "express";
import { connect as ConnectMongoose } from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import mongooseConfig from "./config/mongoose.config";
import APIV1 from "./api/v1";

// CONFIG DOTENV
dotenv.config();

// CREATE SERVER
const app = express();
app.use(json());
app.use(urlencoded({extended: true}));

// USE CORS
app.use(cors());

// CONFIG VERSIONING
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