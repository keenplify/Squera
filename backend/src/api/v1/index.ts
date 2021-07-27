import express from "express";
import Users from "./routes/Users";
import Schools from "./routes/Schools";
import Branches from "./routes/Branches";
import Follows from "./routes/Follows";
import Posts from "./routes/Posts";
import Images from "./routes/Images";

const APIV1 = express.Router();

APIV1.use('/users', Users);
APIV1.use('/schools', Schools);
APIV1.use('/branches', Branches);
APIV1.use('/follows', Follows);
APIV1.use('/posts', Posts);
APIV1.use('/images', Images);

export default APIV1;