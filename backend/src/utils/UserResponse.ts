import { UserInterface } from "../interfaces/User.interface";
import { SUCCESSFUL } from "./STRINGS";

interface UserResponse {
  message: string,
  userId: string,
  username: string,
  email: string,
  token: string
}

export const UserResponse = (user:UserInterface):UserResponse => {
  return {
    message: SUCCESSFUL,
    userId: user.id,
    username: user.username,
    email: user.email,
    token: user.token
  }
}

export const SwaggerUserResponse = {
  type: "object",
  properties: {
      message: {type: 'string', description: "feedback"},
      userId: {type: 'string', description: "uuid"},
      username: {type: 'string'},
      email: {type: 'string'},
      token: {type: 'string'}
  }
}