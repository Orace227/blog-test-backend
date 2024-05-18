import { Router } from "express";
import {
  checkSlugAvailable,
  createBlog,
  deleteBlogs,
  getBlogs,
  updateBlog,
} from "../controllers/blogControllers.js";
import UploadBanner from "../middleware/UploadBanner.js";
import { GetPackageImg } from "../GetPackageImg.js";

const router = Router();

// create blog //
router.post("/createBlog", createBlog);

// get blogs //
router.get("/getBlogs", getBlogs);
router.get("/checkSlugAvailable", checkSlugAvailable);

// update packages//
router.post("/updateBlog", updateBlog);

// delete packages//
router.post("/deleteBlogs", deleteBlogs);

// update banner images //
router.post(
  "/uploadBlogImage",
  UploadBanner.single("bannerImage"),
  async (req, res) => {
    const packageImgPath = req.file.path;

    res
      .status(200)
      .json({ message: "Image uploaded successfully", path: packageImgPath });
  }
);

// get banner images //
router.get("/blogImage/:imageName", GetPackageImg);

router.post("/deleteBanner", async (req, res) => {
  try {
    const { filename } = req.body; // Assuming you send the filename in the request body

    if (!filename) {
      return res
        .status(400)
        .json({ error: "Filename is required in the request body" });
    }

    await deleteImage(filename);

    res.status(200).json({ message: "Banner image deleted successfully" });
  } catch (error) {
    console.error("Error deleting banner image:", error);
    res.status(500).json({ error: "Failed to delete banner image" });
  }
});

export default router;
