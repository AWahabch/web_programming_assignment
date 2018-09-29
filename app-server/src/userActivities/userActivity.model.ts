import * as Mongoose from "mongoose";
import * as Bcrypt from "bcryptjs";
import { Int32 } from "bson";


//Role of user in group
export interface IUserActivity extends Mongoose.Document {
  channelId: string;
  userId: string;
  action: Number; //1: join; 2: leave; 3...
  createdAt: Date;
  updateAt: Date;
}


export const UserActivitySchema = new Mongoose.Schema(
  {
    channelId: { type: String, required: true },
    userId: { type: String, required: true },
    action: { type: Number, required: true }
  },
  {
    timestamps: true
  });

export const UserActivityModel = Mongoose.model<IUserActivity>('UserActivity', UserActivitySchema);
