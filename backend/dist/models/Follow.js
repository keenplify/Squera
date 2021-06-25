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
const Branch_1 = __importDefault(require("./Branch"));
const School_1 = __importDefault(require("./School"));
const User_1 = __importDefault(require("./User"));
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
function Validate(value) {
    return __awaiter(this, void 0, void 0, function* () {
        let promises = [];
        let result = false;
        [User_1.default, School_1.default, Branch_1.default].forEach((model) => promises.push(model.findById(value)
            .then((model) => {
            if (!model || model == null)
                return false;
            return true;
        })));
        yield Promise.all(promises).then((opt) => result = opt.includes(true));
        return result;
    });
}
FollowSchema.path('followerId').validate(Validate, 'nonexistent');
FollowSchema.path('followingId').validate(Validate, 'nonexistent');
const Follow = mongoose_1.model('Follow', FollowSchema);
exports.default = Follow;
//# sourceMappingURL=Follow.js.map