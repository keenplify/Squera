import { Document, ObjectId } from "mongoose";

export interface ImageInterface extends Document<any, any> {
    forId: ObjectId,
    type: string,
    description: string,
    isVerified: boolean,
    path: string
}
