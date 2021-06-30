import axios from "axios";
import { rootServer } from "../utils/server";
import cookie from "cookie";
import { UserResponse } from "./UserResponse";

export const Authenticate = async (token:string) => {
  let userResponse:UserResponse = {
    message: 'INVALID'
  }
  try {
    userResponse = await axios.get(rootServer+'/users/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => res.data)
  } finally {
    return userResponse
  }
}