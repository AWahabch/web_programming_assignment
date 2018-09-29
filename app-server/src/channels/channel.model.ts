import * as Mongoose from "mongoose";
import * as Bcrypt from "bcryptjs";
import { Int32 } from "bson";

export interface IChannel extends Mongoose.Document {
  name: string;
  groupId: string;
  createdAt: Date;
  updateAt: Date;
}


export const ChannelSchema = new Mongoose.Schema(
  {
    name: { type: String, required: true },
    groupId: { type: String, required: true },
  },
  {
    timestamps: true
  });

export const ChannelModel = Mongoose.model<IChannel>('Channel', ChannelSchema);
