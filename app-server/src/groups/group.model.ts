import * as Mongoose from "mongoose";
import * as Bcrypt from "bcryptjs";
import { Int32 } from "bson";

export interface IGroup extends Mongoose.Document {
  name: string;
  createdAt: Date;
  updateAt: Date;
}


export const GroupSchema = new Mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true
  });

export const GroupModel = Mongoose.model<IGroup>('Group', GroupSchema);
