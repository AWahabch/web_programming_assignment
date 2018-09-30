import * as Mongoose from "mongoose";
import * as Bcrypt from "bcryptjs";
import { Int32 } from "bson";

export interface IMessage extends Mongoose.Document {
  userId: string;
  channelId: string;
  type: string;
  content: string;
  createdAt: Date;
  updateAt: Date;
}


export const MessageSchema = new Mongoose.Schema(
  {
    userId: { type: String, required: true },
    channelId: { type: String, required: true },
    type: { type: String },
    content: { type: String },
  },
  {
    timestamps: true
  });

export const MessageModel = Mongoose.model<IMessage>('Message', MessageSchema);
