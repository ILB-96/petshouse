import { models, Schema, model, Types } from "mongoose";

export interface IAddress {
  _id: Types.ObjectId;
  country: string;
  city: string;
  street: string;
  house?: string;
  floor?: string;
  zip?: string;
}

export const addressSchema = new Schema<IAddress>({
  country: { type: String, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true },
  house: { type: String },
  floor: { type: String },
  zip: { type: String },
});

const Address = models?.Address || model<IAddress>("Address", addressSchema);
export default Address;
