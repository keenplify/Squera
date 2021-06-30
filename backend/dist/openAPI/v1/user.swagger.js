"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = void 0;
const UserResponse_1 = require("../../utils/UserResponse");
exports.getMe = {
    tags: ['User'],
    description: "Returns all pets from the system that the user has access to",
    operationId: 'getUser',
    security: [
        {
            // @ts-ignore
            bearerAuth: []
        }
    ],
    responses: {
        "200": {
            description: "A User Response.",
            "content": {
                "application/json": {
                    schema: UserResponse_1.SwaggerUserResponse
                }
            },
        },
        "401": { description: "Unauthorized" }
    }
};
//# sourceMappingURL=user.swagger.js.map