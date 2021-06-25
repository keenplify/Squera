import { Model, ObjectId, Document } from "mongoose";

export class RefChecker {
  _models:Model<any, any, any>[]

  constructor(models:Model<any, any, any>[]) {
    this._models = models;
  }
  
  async validate(id:string | ObjectId) {
    let arr:Array<Promise<any[]>>=[];
    let validate=false;

    this._models.forEach(model => {
      arr.push(
        model.findById(id).then((result:Document<any, any>)=>{
          if (!result || result == null) return false;
          validate=true
        })
      )
    })

    await Promise.all(arr);
    
    return validate;
  }
}