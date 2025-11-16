import multer from "multer";
import path from "path";
import fs from "fs";
import cloudinaryModule from "cloudinary";

const uploadsRoot = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsRoot)) {
  fs.mkdirSync(uploadsRoot);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsRoot);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/\s+/g, "_");
    cb(null, `${base}-${Date.now()}${ext}`);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image uploads are allowed"));
    }
    cb(null, true);
  },
});

// Optional: Cloudinary support via CLOUDINARY_URL
const cloudinary = cloudinaryModule.v2;
if (process.env.CLOUDINARY_URL) {
  cloudinary.config({
    secure: true,
  });
}

export const uploadMemory = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image uploads are allowed"));
    }
    cb(null, true);
  },
});

export const uploadToCloudinary = async (buffer) =>
  new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "tenalink" }, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      })
      .end(buffer);
  });


