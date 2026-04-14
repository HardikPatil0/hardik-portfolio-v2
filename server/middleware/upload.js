import multer from "multer";

// Store file in memory (NOT on disk)
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedImages = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
  const allowedPdf = ["application/pdf"];

  if (allowedImages.includes(file.mimetype) || allowedPdf.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only images and PDF allowed"), false);
  }
};

export const upload = multer({ storage, fileFilter });