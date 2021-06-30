import { Request } from "express";
import { Query, Document } from "mongoose";

function Paginate(
    req:Request<any>, 
    document:Query<Document<any, any>[], Document<any, any>, {}>
  ) {
  if (req.query?.withList) {
    const paginate:number = parseInt(req.query?.paginate as string) || 10;
    const pageNumber:number = parseInt(req.query?.pageNumber as string) || 1;
    document.sort('createdAt').skip((pageNumber)*(paginate)).limit(paginate)
  }
}

export default Paginate