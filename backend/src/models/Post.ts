import { model, Schema } from 'mongoose'
import { PostInterface } from '../interfaces/Post.interface';
import mongooseAudit from '../utils/Mongoose-Audit';

const PostSchema = new Schema<PostInterface>({
    text: {type: String, required: true},
    schoolId: {type: Schema.Types.ObjectId, ref: "School"},
    branchId: {type: Schema.Types.ObjectId, ref: "Branch"},
    isAnon: {type: Boolean, default: false, required: true}
}, {
    timestamps: true
})

PostSchema.plugin(mongooseAudit, {userModel: "User"});

const Post = model('Post', PostSchema);

export default Post;