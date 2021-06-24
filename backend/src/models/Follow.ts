import { model, Schema } from 'mongoose'

import { FollowInterface } from '../interfaces/Follow.interface';
import Branch from './Branch';
import School from './School';
import User from './User';

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

async function Validate(value:string) {
  let promises:Promise<any>[] = [];
  let result = false;

  [User, School, Branch].forEach((model)=> 
    promises.push(
      model.findById(value)
      .then((model) => {
        if (!model || model == null) return false;
        return true;
      })
    )
  );

  await Promise.all(promises).then((opt)=> result = opt.includes(true)) 

  return result;
}

FollowSchema.path('followerId').validate(Validate, 'nonexistent');
FollowSchema.path('followingId').validate(Validate, 'nonexistent');

const Follow = model('Follow', FollowSchema);

export default Follow;