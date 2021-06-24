import { Document } from "mongoose";
import { Audit } from "./Audit.interface";

export interface SchoolInterface extends Document<any, any>, Audit {
    id: string;
    name: string;
    description: string;
    isVerified: boolean;
}
