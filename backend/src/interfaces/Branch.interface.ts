import { Document } from "mongoose";
import { Audit } from "./Audit.interface";

export interface BranchInterface extends Document<any, any>, Audit {
    id: string;
    schoolId: string;
    name: string;
    address: string;
    coordinates: {
      x: Float32Array;
      y: Float32Array
    };
    isVerified: boolean;
}
