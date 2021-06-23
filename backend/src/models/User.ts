import { model, Schema } from 'mongoose'
import { UserInterface } from '../interfaces/User.interface'
import bcrypt from 'bcrypt';

const UserSchema = new Schema<UserInterface>({
    username: { type: String, required: true, unique: true, minlength: 3, trim: true },
    password: { type: String, required: true, minlength: 6 },
    email: { type: String, sparse: true },
    schoolsFollowing: { type: Array }
}, {
    timestamps: true
})

UserSchema.pre("save", function (next: (err?: Error | undefined)=>void ) {

  if (!this.isModified('password')) return next();

  bcrypt.hash(this.password, 7, (err: Error, hash: string) => {
    if (err) return next(err);
    this.password = hash;

    return next();
  });
})

const User = model('User', UserSchema);

export default User;