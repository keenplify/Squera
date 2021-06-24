import { model, Schema } from 'mongoose'
import mongooseAudit from '../utils/Mongoose-Audit';

import { SchoolInterface } from '../interfaces/School.interface';

const SchoolSchema = new Schema<SchoolInterface>({
    name: { type: String, required: true, unique: true, minlength: 3 },
    description: { type: String, minlength: 3 },
    isVerified: { type: Boolean, default: false}
}, {
    timestamps: true
})

SchoolSchema.plugin(mongooseAudit, {userModel: "User"});

const School = model('School', SchoolSchema);

export default School;