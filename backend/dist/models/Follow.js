"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const FollowSchema = new mongoose_1.Schema({
    followerId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    followingId: { type: mongoose_1.Schema.Types.ObjectId, required: true }
}, {
    timestamps: true,
    strict: false
});
FollowSchema.index({
    followerId: 1,
    followingId: 1
}, {
    unique: true
});
const Follow = mongoose_1.model('Follow', FollowSchema);
exports.default = Follow;
//# sourceMappingURL=Follow.js.map