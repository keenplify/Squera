import { model, Schema } from 'mongoose'
import { UserInterface } from '../interfaces/User.interface'
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const UserSchema = new Schema<UserInterface>({
    username: { type: String, required: true, unique: true, minlength: 3, trim: true },
    password: { type: String, required: true, minlength: 6 },
    email: { type: String, sparse: true },
    token: { type: String },
    role: { type: Number, default: 0 }
}, {
    timestamps: true
})

UserSchema.pre("save", function (next) {

  // CREATE TOKEN IF NEW
  if (this.isNew) this.token = crypto.randomBytes(128).toString('hex')

  // HASH PASSWORD IF CHANGED/NEW
  if (!this.isModified('password')) return next();

  bcrypt.hash(this.password, 7, (err: Error, hash: string) => {
    if (err) return next(err);
    this.password = hash;

    return next();
  });
})

const User = model('User', UserSchema);

export default User;