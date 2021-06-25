"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Mongoose_Audit_1 = __importDefault(require("../utils/Mongoose-Audit"));
const PostSchema = new mongoose_1.Schema({
    text: { type: String, required: true },
    schoolId: { type: mongoose_1.Schema.Types.ObjectId, ref: "School" },
    branchId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Branch" },
    isAnon: { type: Boolean, default: false, required: true }
}, {
    timestamps: true
});
PostSchema.plugin(Mongoose_Audit_1.default, { userModel: "User" });
const Post = mongoose_1.model('Post', PostSchema);
exports.default = Post;
//# sourceMappingURL=Post.js.map