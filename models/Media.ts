import mongoose, { Schema, Document } from "mongoose";

export interface IMedia extends Document {
  filename: string;
  url: string;
  mimeType: string;
  size: number;
}

const MediaSchema: Schema = new Schema(
  {
    filename: { type: String, required: true },
    url: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Media ||
  mongoose.model<IMedia>("Media", MediaSchema);
