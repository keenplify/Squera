import { Document } from "mongoose";

export interface UserInterface extends Document<any, any> {
    username: string;
    password: string;
    token: string;
    email?: string;
    role: number;
}
