import { model, Schema } from 'mongoose'
import { CommentInterface } from '../interfaces/Comment.interface';
import mongooseAudit from '../utils/Mongoose-Audit';

const CommentSchema = new Schema<CommentInterface>({
    text: {type: String, required: true},
    postId: {type: Schema.Types.ObjectId, ref: "Post"},
    isAnon: {type: Boolean, default: false, required: true}
}, {
    timestamps: true
})

CommentSchema.plugin(mongooseAudit, {userModel: "User"});

const Comment = model('Comment', CommentSchema);

export default Comment;