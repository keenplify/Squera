import express from "express";
import Users from "./routes/Users";

const APIV1 = express.Router();

APIV1.use('/users', Users)

export default APIV1;