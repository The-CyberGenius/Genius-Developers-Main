import mongoose, { Schema, Document } from "mongoose";

export interface ISkill extends Document {
  name: string;
  category: string;
  icon: string;
  proficiency: number;
  order: number;
}

const SkillSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true, default: "Frontend" },
    icon: { type: String, default: "" },
    proficiency: { type: Number, default: 80 },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Skill ||
  mongoose.model<ISkill>("Skill", SkillSchema);
