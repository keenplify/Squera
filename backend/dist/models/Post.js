"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RefChecker_1 = require("../utils/RefChecker");
const Mongoose_Audit_1 = __importDefault(require("../utils/Mongoose-Audit"));
const School_1 = __importDefault(require("./School"));
const Branch_1 = __importDefault(require("./Branch"));
const mongoose_paginate_ts_1 = require("mongoose-paginate-ts");
const PostSchema = new mongoose_1.Schema({
    text: { type: String, required: true },
    schoolId: { type: mongoose_1.Schema.Types.ObjectId, ref: "School" },
    branchId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Branch" },
    isAnon: { type: Boolean, default: false, required: true }
}, {
    timestamps: true
});
PostSchema.path("schoolId").validate((v) => __awaiter(void 0, void 0, void 0, function* () { return yield new RefChecker_1.RefChecker([School_1.default]).validate(v); }));
PostSchema.path("branchId").validate((v) => __awaiter(void 0, void 0, void 0, function* () { return yield new RefChecker_1.RefChecker([Branch_1.default]).validate(v); }));
PostSchema.plugin(Mongoose_Audit_1.default, { userModel: "User" });
PostSchema.plugin(mongoose_paginate_ts_1.mongoosePagination);
const Post = mongoose_1.model('Post', PostSchema);
exports.default = Post;
//# sourceMappingURL=Post.js.map