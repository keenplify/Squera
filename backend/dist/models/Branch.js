"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Mongoose_Audit_1 = __importDefault(require("../utils/Mongoose-Audit"));
const BranchSchema = new mongoose_1.Schema({
    schoolId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "School" },
    name: { type: String, required: true, minlength: 3 },
    geoCityId: { type: String },
    geoCountryCode: { type: String },
    coordinates: { type: Array },
    isVerified: { type: Boolean, default: false }
}, {
    timestamps: true
});
BranchSchema.plugin(Mongoose_Audit_1.default, { userModel: "User" });
const Branch = mongoose_1.model('Branch', BranchSchema);
exports.default = Branch;
//# sourceMappingURL=Branch.js.map