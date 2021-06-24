import { Document } from "mongoose";

export interface FollowInterface extends Document<any, any> {
    id: string;
    followerId: string;
    followingId: string
}
