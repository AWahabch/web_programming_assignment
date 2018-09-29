import * as Mongoose from "mongoose";
import * as Bcrypt from "bcryptjs";
import { Int32 } from "bson";


//Role of user in group
export interface IUserChannel extends Mongoose.Document {
  channelId: string;
  userId: string;
  createdAt: Date;
  updateAt: Date;
}


export const UserChannelSchema = new Mongoose.Schema(
  {
    channelId: { type: String, required: true },
    userId: { type: String, required: true },
  },
  {
    timestamps: true
  });

export const UserChannelModel = Mongoose.model<IUserChannel>('UserChannel', UserChannelSchema);
