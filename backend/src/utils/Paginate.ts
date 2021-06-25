import { Request } from "express";
import { Query, Document } from "mongoose";

function Paginate(
    req:Request<any>, 
    document:Query<Document<any, any>[], Document<any, any>, {}>
  ) {
  if (req.body?.withList && req.body?.pageNumber) {
    const paginate:number = parseInt(req.body?.paginate) || 10;
    const pageNumber:number = parseInt(req.body.pageNumber) || 1;
  
    document.sort('createdAt').skip((pageNumber)*(paginate)).limit(paginate)
  }
}

export default Paginate