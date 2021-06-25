//Modified copy from https://github.com/cme-pro/mongoose-audit/blob/master/src/mongoose-audit.ts


import { Schema } from "mongoose";

interface Options {
  userModel?: string;
}

export default function mongooseAudit(schema: Schema, options: Options):void {
  schema.add({
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: options.userModel || "User",
      required: true
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: options.userModel || "User"
    }
  });
}