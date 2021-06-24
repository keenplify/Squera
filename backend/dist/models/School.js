"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Mongoose_Audit_1 = __importDefault(require("../utils/Mongoose-Audit"));
const SchoolSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true, minlength: 3 },
    description: { type: String, minlength: 3 },
    isVerified: { type: Boolean, default: false }
}, {
    timestamps: true
});
SchoolSchema.plugin(Mongoose_Audit_1.default, { userModel: "User" });
const School = mongoose_1.model('School', SchoolSchema);
exports.default = School;
//# sourceMappingURL=School.js.map