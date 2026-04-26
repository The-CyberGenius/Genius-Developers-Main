import mongoose, { Schema, Document } from "mongoose";

export interface IProfile extends Document {
  name: string;
  tagline: string;
  aboutText: string;
  profileImage: string;
  coverImage: string;
  location: string;
  email: string;
  phone: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
    youtube: string;
    instagram: string;
  };
  yearsExperience: string;
  projectsDelivered: string;
  technologiesMastered: string;
}

const ProfileSchema: Schema = new Schema(
  {
    name: { type: String, required: true, default: "Shiva" },
    tagline: { type: String, default: "AI Full Stack Developer" },
    aboutText: { type: String, default: "I build world-class digital products." },
    profileImage: { type: String, default: "" },
    coverImage: { type: String, default: "" },
    location: { type: String, default: "India" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    socialLinks: {
      github: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
      youtube: { type: String, default: "" },
      instagram: { type: String, default: "" },
    },
    yearsExperience: { type: String, default: "3+" },
    projectsDelivered: { type: String, default: "25+" },
    technologiesMastered: { type: String, default: "15+" },
  },
  { timestamps: true }
);

export default mongoose.models.Profile ||
  mongoose.model<IProfile>("Profile", ProfileSchema);
