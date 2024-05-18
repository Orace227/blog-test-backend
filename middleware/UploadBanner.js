import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "blogImage/";

    // Check if the directory exists
    if (!fs.existsSync(dir)) {
      // If it doesn't exist, create it
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir); // Store files in the 'BannerImg' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "")); // Rename the file
  },
});

const UploadBanner = multer({ storage: storage });

export default UploadBanner;
