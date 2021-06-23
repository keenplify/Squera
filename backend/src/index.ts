import express from "express";
import { connect as ConnectMongoose } from "mongoose";
import dotenv from "dotenv";
import mongooseConfig from "./config/mongoose.config";

// CONFIG DOTENV
dotenv.config();

const app = express();

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
    console.log( `Server started at http://localhost:${ process.env.EXPRESS_PORT }` );
} );