import { Schema } from 'mongoose'
import { User } from '../interface/User.interface'
import bcrypt from 'bcrypt';

const UserSchema = new Schema<User>({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String },
    schoolsFollowing: { type: Array }
}, {
    timestamps: true
})

UserSchema.pre("save", function (next: (err?: Error | undefined)=>void ) {
    
  if (!this.isModified('password')) return next();

  bcrypt.hash(this.password, 8, (err: Error, hash: string) => {
    if (err) return next(err);
    this.password = hash;
  });
})