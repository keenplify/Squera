"use strict";
//Modified copy from https://github.com/cme-pro/mongoose-audit/blob/master/src/mongoose-audit.ts
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
function mongooseAudit(schema, options) {
    schema.add({
        createdBy: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: options.userModel || "User"
        },
        updatedBy: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: options.userModel || "User"
        }
    });
}
exports.default = mongooseAudit;
//# sourceMappingURL=Mongoose-Audit.js.map