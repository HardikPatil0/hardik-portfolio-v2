import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    portfolioName: { type: String, default: "Hardik Patil" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    location: { type: String, default: "India" },

    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    instagram: { type: String, default: "" },
    blog: { type: String, default: "" },

    logo: { type: String, default: "" }, // /uploads/images/....
  },
  { timestamps: true }
);

export default mongoose.model("Settings", settingsSchema);
