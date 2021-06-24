import { UserInterface } from "../interfaces/User.interface";
import { SUCCESSFUL } from "./STRINGS";

interface UserResponse {
  message: string,
  userId: string,
  username: string,
  email: string
}

export const UserResponse = (user:UserInterface):UserResponse => {
  return {
    message: SUCCESSFUL,
    userId: user.id,
    username: user.username,
    email: user.email
  }
}