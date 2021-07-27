"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Mongoose_Audit_1 = __importDefault(require("../utils/Mongoose-Audit"));
const ImageSchema = new mongoose_1.Schema({
    type: { type: String },
    description: { type: String, minlength: 3 },
    forId: { type: String, required: true },
    isVerified: { type: Boolean, default: false }
}, {
    timestamps: true
});
ImageSchema.plugin(Mongoose_Audit_1.default, { userModel: "User" });
const Image = mongoose_1.model('Image', ImageSchema);
exports.default = Image;
//# sourceMappingURL=Image.js.map