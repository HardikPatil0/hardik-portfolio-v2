import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    tech: { type: [String], default: [] },
    github: { type: String, default: "" },
    live: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    type: { type: String, default: "General" }, // ✅ category
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
