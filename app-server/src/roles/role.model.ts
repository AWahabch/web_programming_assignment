import * as Mongoose from "mongoose";
import * as Bcrypt from "bcryptjs";
import { Int32 } from "bson";

export interface IRole extends Mongoose.Document {
  name: string;
  createdAt: Date;
  updateAt: Date;
}


export const RoleSchema = new Mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true
  });

export const RoleModel = Mongoose.model<IRole>('Role', RoleSchema);
