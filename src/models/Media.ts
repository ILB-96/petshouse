import { models, Schema, Document, model, Types } from "mongoose";
import { z } from "zod";
export enum MediaType {
  JPEG = "image/jpeg",
  PNG = "image/png",
  GIF = "image/gif",
  SVG = "image/svg+xml",
  VIDEO = "video/mp4",
}
export const mediaSchemaZod = z.object({
  name: z.string().min(1, "Name is required"),
  source: z.string().min(1, "Source is required"),
  caption: z.string().optional(),
  type: z.string().min(1, "Type is required"),
});

export type IMedia = z.infer<typeof mediaSchemaZod> &
  Document & { _id: string | Types.ObjectId };

export const mediaSchema = new Schema<IMedia>({
  name: { type: String, required: true, unique: true },
  source: { type: String, required: true, unique: true },
  caption: { type: String },
  type: { type: String, required: true },
});

const Media = models?.Media || model<IMedia>("Media", mediaSchema);
export default Media;
