import * as Mongoose from "mongoose";
import * as Bcrypt from "bcryptjs";
import { Int32 } from "bson";

export interface IMessage extends Mongoose.Document {
  content: string;
  image: string;
  createdAt: Date;
  updateAt: Date;
}


export const MessageSchema = new Mongoose.Schema(
  {
    userId: { type: String, required: true },
    channelId: { type: String, required: true },
    content: { type: String },
    image: { type: String },
  },
  {
    timestamps: true
  });

export const MessageModel = Mongoose.model<IMessage>('Message', MessageSchema);
