import * as Mongoose from "mongoose";
import * as Bcrypt from "bcryptjs";
import { Int32 } from "bson";


//Role of user in group
export interface IUserRole extends Mongoose.Document {
  roleId: string;
  userId: string;
  createdAt: Date;
  updateAt: Date;
}


export const UserRoleSchema = new Mongoose.Schema(
  {
    roleId: { type: String, required: true },
    userId: { type: String, required: true },
  },
  {
    timestamps: true
  });

export const UserRoleModel = Mongoose.model<IUserRole>('UserRole', UserRoleSchema);
