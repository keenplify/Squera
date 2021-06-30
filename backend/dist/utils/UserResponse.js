"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerUserResponse = exports.UserResponse = void 0;
const STRINGS_1 = require("./STRINGS");
const UserResponse = (user) => {
    return {
        message: STRINGS_1.SUCCESSFUL,
        userId: user.id,
        username: user.username,
        email: user.email,
        token: user.token
    };
};
exports.UserResponse = UserResponse;
exports.SwaggerUserResponse = {
    type: "object",
    properties: {
        message: { type: 'string', description: "feedback" },
        userId: { type: 'string', description: "uuid" },
        username: { type: 'string' },
        email: { type: 'string' },
        token: { type: 'string' }
    }
};
//# sourceMappingURL=UserResponse.js.map