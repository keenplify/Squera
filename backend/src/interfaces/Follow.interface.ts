import { Document, ObjectId } from "mongoose";

export interface FollowInterface extends Document<any, any> {
    id: string;
    followerId: ObjectId;
    followingId: ObjectId
}
