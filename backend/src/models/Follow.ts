import { model, Schema } from 'mongoose'

import { FollowInterface } from '../interfaces/Follow.interface';

const FollowSchema = new Schema<FollowInterface>({
    followerId: { type: Schema.Types.ObjectId, required: true},
    followingId: { type: Schema.Types.ObjectId, required: true}
}, {
    timestamps: true, 
    strict: false
}, )

FollowSchema.index({
  followerId: 1,
  followingId: 1
}, {
  unique: true
})

const Follow = model('Follow', FollowSchema);

export default Follow;