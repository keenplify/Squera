import { ObjectId } from "mongoose";

export interface Audit {
  createdBy: ObjectId,
  createdAt: Date,
  updatedBy: ObjectId,
  updatedAt: Date
}