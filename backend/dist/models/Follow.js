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
const User_1 = __importDefault(require("./User"));
const School_1 = __importDefault(require("./School"));
const Branch_1 = __importDefault(require("./Branch"));
const mongoose_paginate_ts_1 = require("mongoose-paginate-ts");
const FollowSchema = new mongoose_1.Schema({
    followerId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    followingId: { type: mongoose_1.Schema.Types.ObjectId, required: true }
}, {
    timestamps: true,
    strict: false
});
const ValidToFollow = [User_1.default, School_1.default, Branch_1.default];
FollowSchema.path("followerId").validate((v) => __awaiter(void 0, void 0, void 0, function* () { return yield new RefChecker_1.RefChecker(ValidToFollow).validate(v); }));
FollowSchema.path("followingId").validate((v) => __awaiter(void 0, void 0, void 0, function* () { return yield new RefChecker_1.RefChecker(ValidToFollow).validate(v); }));
FollowSchema.index({
    followerId: 1,
    followingId: 1
}, {
    unique: true
});
FollowSchema.plugin(mongoose_paginate_ts_1.mongoosePagination);
const Follow = mongoose_1.model('Follow', FollowSchema);
exports.default = Follow;
//# sourceMappingURL=Follow.js.map