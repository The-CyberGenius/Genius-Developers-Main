import mongoose, { Schema, Document } from "mongoose";

export interface ISeo extends Document {
  siteTitle: string;
  metaDescription: string;
  keywords: string;
  ogImage: string;
}

const SeoSchema: Schema = new Schema(
  {
    siteTitle: { type: String, default: "Premium Portfolio" },
    metaDescription: { type: String, default: "A world-class portfolio." },
    keywords: { type: String, default: "portfolio, developer" },
    ogImage: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Seo || mongoose.model<ISeo>("Seo", SeoSchema);
