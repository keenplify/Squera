"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const UserSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true, minlength: 3, trim: true },
    password: { type: String, required: true, minlength: 6 },
    email: { type: String, sparse: true },
    token: { type: String }
}, {
    timestamps: true
});
UserSchema.pre("save", function (next) {
    // CREATE TOKEN IF NEW
    if (this.isNew)
        this.token = crypto_1.default.randomBytes(128).toString('hex');
    // HASH PASSWORD IF CHANGED/NEW
    if (!this.isModified('password'))
        return next();
    bcrypt_1.default.hash(this.password, 7, (err, hash) => {
        if (err)
            return next(err);
        this.password = hash;
        return next();
    });
    // FALLBACK
    return next();
});
const User = mongoose_1.model('User', UserSchema);
exports.default = User;
//# sourceMappingURL=User.js.map