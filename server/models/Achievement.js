import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },          // e.g. "React Certificate"
    issuer: { type: String, default: "" },            // e.g. "Coursera / Udemy / Google"
    category: { type: String, default: "Certification" }, // Certification / Internship / Award / Hackathon
    date: { type: String, default: "" },              // e.g. "Feb 2025"
    imageUrl: { type: String, default: "" },          // optional (later we can upload)
    proofUrl: { type: String, default: "" },          // optional (certificate link)
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Achievement", achievementSchema);
