import { models, Schema, Types, Document, model } from "mongoose";
import { IAddress, addressSchema } from "./Address";

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  password: string;
  name: string;
  phone?: string;
  image?: string;
  role?: Role;
  cartId: Types.ObjectId;
  address?: IAddress;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    phone: { type: String },
    role: { type: String, enum: Object.values(Role), default: Role.USER }, // Fixed enum definition
    image: { type: String },
    cartId: { type: Schema.Types.ObjectId, ref: "Cart", required: true },
    address: { type: addressSchema },
  },
  {
    timestamps: true,
  }
);

export const User = models?.User || model<IUser>("User", userSchema);
