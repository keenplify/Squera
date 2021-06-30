import { model, ObjectId, Schema } from 'mongoose'
import {RefChecker} from '../utils/RefChecker';
import { PostInterface } from '../interfaces/Post.interface';
import mongooseAudit from '../utils/Mongoose-Audit';
import School from './School';
import Branch from './Branch';
import { mongoosePagination, Pagination } from "mongoose-paginate-ts";
 
const PostSchema = new Schema<PostInterface>({
    text: {type: String, required: true},
    schoolId: {type: Schema.Types.ObjectId,ref: "School"},
    branchId: {type: Schema.Types.ObjectId, ref: "Branch"},
    isAnon: {type: Boolean, default: false, required: true}
}, {
    timestamps: true
})



PostSchema.path("schoolId").validate(async (v:ObjectId) => await new RefChecker([School]).validate(v))
PostSchema.path("branchId").validate(async (v:ObjectId) => await new RefChecker([Branch]).validate(v))

PostSchema.plugin(mongooseAudit, {userModel: "User"});
PostSchema.plugin(mongoosePagination);

const Post:Pagination<PostInterface> = model<PostInterface, Pagination<PostInterface>>('Post', PostSchema);

export default Post;