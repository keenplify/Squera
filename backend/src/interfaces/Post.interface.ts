import { Document, ObjectId } from "mongoose";
import { Audit } from "./Audit.interface";

export interface PostInterface extends Document<any, any>, Audit {
    schoolId: ObjectId;
    branchId: ObjectId;
    text: string;
    isAnon: boolean;
}
