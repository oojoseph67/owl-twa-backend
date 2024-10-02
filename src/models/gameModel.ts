import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./User";

export interface IGame extends Document {
  userId: IUser["_id"];
  userLevel: number;
  apeLevel: number;
}

const GameSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  userLevel: { type: Number, required: true, default: 1 },
  apeLevel: { type: Number, required: true, default: 1 },
});

export default mongoose.model<IGame>("Game", GameSchema);
