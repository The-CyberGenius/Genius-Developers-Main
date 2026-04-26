import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  technologies: string[];
  thumbnail: string;
  galleryImages: string[];
  liveDemoLink: string;
  githubLink: string;
  featured: boolean;
  order: number;
  isActive: boolean;
}

const ProjectSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, required: true },
    category: { type: String, required: true },
    technologies: [{ type: String }],
    thumbnail: { type: String, default: "" },
    galleryImages: [{ type: String }],
    liveDemoLink: { type: String, default: "" },
    githubLink: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Project ||
  mongoose.model<IProject>("Project", ProjectSchema);
