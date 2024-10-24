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
  country: { type: String, default: "" },
  city: { type: String, default: "" },
  street: { type: String, default: "" },
  house: { type: String, default: "" },
  floor: { type: String, default: "" },
  zip: { type: String, default: "" },
});

const Address = models?.Address || model<IAddress>("Address", addressSchema);
export default Address;
