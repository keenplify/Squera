"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResponse = void 0;
const STRINGS_1 = require("./STRINGS");
const UserResponse = (user) => {
    return {
        message: STRINGS_1.SUCCESSFUL,
        userId: user.id,
        username: user.username,
        email: user.email
    };
};
exports.UserResponse = UserResponse;
//# sourceMappingURL=UserResponse.js.map