import { model, Schema } from 'mongoose'
import mongooseAudit from '../utils/Mongoose-Audit';

import { BranchInterface } from '../interfaces/Branch.interface';

const BranchSchema = new Schema<BranchInterface>({
    schoolId: { type: Schema.Types.ObjectId, required: true, ref: "School" },
    name: { type: String, required: true, unique: true, minlength: 3 },
    geoCityId: { type: String },
    geoCountryCode: { type: String },
    coordinates: { type: Array },
    isVerified: { type: Boolean, default: false }
}, {
    timestamps: true
})

BranchSchema.plugin(mongooseAudit, {userModel: "User"});

const Branch = model('Branch', BranchSchema);

export default Branch;