import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    type: { type: String, default: "Internship" }, // Internship / Freelance / Job
    startDate: { type: String, default: "" }, // "Jan 2025"
    endDate: { type: String, default: "" },   // "Mar 2025" or "Present"
    description: { type: String, default: "" },
    skills: { type: [String], default: [] },
    certificateUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Experience", experienceSchema);
