import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  createdAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);