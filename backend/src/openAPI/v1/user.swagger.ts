import { SwaggerUserResponse } from "../../utils/UserResponse";

export const getMe = {
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
                schema: SwaggerUserResponse
            }
        },
    },
    "401": {description: "Unauthorized"}
  }
} 