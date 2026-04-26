import mongoose, { Schema, Document } from "mongoose";

export interface IResume extends Document {
  sourceType: "upload" | "generated";
  fileUrl: string;
}

const ResumeSchema: Schema = new Schema(
  {
    sourceType: { type: String, enum: ["upload", "generated"], default: "generated" },
    fileUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Resume ||
  mongoose.model<IResume>("Resume", ResumeSchema);
