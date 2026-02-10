import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    desc: { type: String, default: "" },
  },
  { _id: false }
);

const statsSchema = new mongoose.Schema(
  {
    projects: { type: String, default: "10+" },
    internships: { type: String, default: "2" },
    openSource: { type: String, default: "Active" },
  },
  { _id: false }
);

const linksSchema = new mongoose.Schema(
  {
    github: { type: String, default: "https://github.com/" },
    linkedin: { type: String, default: "" },
  },
  { _id: false }
);

const profileSchema = new mongoose.Schema(
  {
    // basic
    name: { type: String, default: "Hardik Patil" },
    title: { type: String, default: "MERN Stack Developer" },
    intro: { type: String, default: "" },
    skills: { type: [String], default: [] },

    // uploads
    profileImage: { type: String, default: "" },
    resumePdf: { type: String, default: "" },

    // home extra controls
    badgeText: { type: String, default: "Available for Freelance Projects" },
    showBadge: { type: Boolean, default: true },

    stats: { type: statsSchema, default: () => ({}) },
    links: { type: linksSchema, default: () => ({}) },

    services: {
      type: [serviceSchema],
      default: () => [
        {
          title: "Frontend Development",
          desc: "Modern UI with React + Tailwind, responsive and pixel-perfect.",
        },
        {
          title: "Backend + APIs",
          desc: "Secure REST APIs, authentication, MongoDB models, clean architecture.",
        },
        {
          title: "CMS + Client Updates",
          desc: "Sanity CMS integration so clients can update content easily.",
        },
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
