import { model, ObjectId, Schema } from 'mongoose'
import { RefChecker } from '../utils/RefChecker';

import { FollowInterface } from '../interfaces/Follow.interface';
import User from './User';
import School from './School';
import Branch from './Branch';


const FollowSchema = new Schema<FollowInterface>({
    followerId: { type: Schema.Types.ObjectId, required: true},
    followingId: { type: Schema.Types.ObjectId, required: true}
}, {
    timestamps: true, 
    strict: false
}, )

const ValidToFollow = [User, School, Branch]
FollowSchema.path("followerId").validate(async (v:ObjectId) => await new RefChecker(ValidToFollow).validate(v))
FollowSchema.path("followingId").validate(async (v:ObjectId) => await new RefChecker(ValidToFollow).validate(v))

FollowSchema.index({
  followerId: 1,
  followingId: 1
}, {
  unique: true
})

const Follow = model('Follow', FollowSchema);

export default Follow;