import { models, Schema, Types, Document, model } from "mongoose";

export enum MediaType {
  JPEG = "image/jpeg",
  PNG = "image/png",
  VIDEO = "video/mp4",
}

export interface IMedia extends Document {
  _id: Types.ObjectId;
  name: string;
  data: Buffer;
  caption?: string;
  contentType: MediaType;
}

export const mediaSchema = new Schema<IMedia>({
  name: { type: String, required: true },
  data: { type: Buffer, required: true },
  caption: { type: String },
  contentType: { enum: Object.values(MediaType), required: true },
});

// Use the correct collection name 'Media' here
const Media = models?.Media || model<IMedia>("Media", mediaSchema);
export default Media;

//TODO: Search Thumbnail for Media Type