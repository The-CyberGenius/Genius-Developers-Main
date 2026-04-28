import mongoose, { Schema, Document } from "mongoose";

export interface ISettings extends Document {
  theme: "light" | "dark" | "system" | "neon" | "apple" | "custom";
  customColors: {
    primary: string;
    background: string;
    text: string;
  };
  maintenanceMode: boolean;
  hideServices: boolean;
  hideTestimonials: boolean;
  analyticsEnabled: boolean;
}

const SettingsSchema: Schema = new Schema(
  {
    theme: { type: String, default: "apple" },
    customColors: {
      primary: { type: String, default: "#000000" },
      background: { type: String, default: "#ffffff" },
      text: { type: String, default: "#111111" },
    },
    maintenanceMode: { type: Boolean, default: false },
    hideServices: { type: Boolean, default: false },
    hideTestimonials: { type: Boolean, default: false },
    analyticsEnabled: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Settings ||
  mongoose.model<ISettings>("Settings", SettingsSchema);
