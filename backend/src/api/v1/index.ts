import express from "express";
import Users from "./routes/Users";
import Schools from "./routes/Schools";
import Branches from "./routes/Branches";
import Follows from "./routes/Follows";

const APIV1 = express.Router();

APIV1.use('/users', Users);
APIV1.use('/schools', Schools);
APIV1.use('/branches', Branches);
APIV1.use('/follows', Follows);


export default APIV1;