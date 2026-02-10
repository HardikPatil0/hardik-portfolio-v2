import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, "uploads/resume");
    } else {
      cb(null, "uploads/images");
    }
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedImages = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
  const allowedPdf = ["application/pdf"];

  if (allowedImages.includes(file.mimetype) || allowedPdf.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only images (png/jpg/jpeg/webp) and PDF allowed"), false);
  }
};

export const upload = multer({ storage, fileFilter });
