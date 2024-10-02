import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  telegramId: string;
  walletAddress: string | null;
  profilePicture: string | null;
  points: number;
  diamonds: number;
  lastClaimDate: Date | null;
  referredBy: string | null;
  referrals: number;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  telegramId: { type: String, required: true, unique: true },
  walletAddress: {
    type: String,
    unique: true,
    sparse: true,
  },
  profilePicture: { type: String, default: null },
  points: { type: Number, default: 0 },
  diamonds: { type: Number, default: 0 },
  lastClaimDate: { type: Date, default: null },
  referredBy: { type: String, default: null },
  referrals: { type: Number, default: 0 },
});

export default mongoose.model<IUser>("User", UserSchema);
