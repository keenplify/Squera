import { Document, ObjectId } from "mongoose";
import { Audit } from "./Audit.interface";

export interface CommentInterface extends Document<any, any>, Audit {
    text: string;
    isAnon: boolean;
    postId: ObjectId
}
