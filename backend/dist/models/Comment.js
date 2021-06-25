"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Mongoose_Audit_1 = __importDefault(require("../utils/Mongoose-Audit"));
const CommentSchema = new mongoose_1.Schema({
    text: { type: String, required: true },
    postId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Post" },
    isAnon: { type: Boolean, default: false, required: true }
}, {
    timestamps: true
});
CommentSchema.plugin(Mongoose_Audit_1.default, { userModel: "User" });
const Comment = mongoose_1.model('Comment', CommentSchema);
exports.default = Comment;
//# sourceMappingURL=Comment.js.map