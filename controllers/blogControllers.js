import blog from "../models/blog.js";

export const createBlog = async (req, res) => {
  try {
    const createBlog = await blog.create(req.body);
    if (!createBlog)
      return res
        .status(400)
        .json({ message: "blog does not created", status: "blogNotCreated" });
    res.status(200).json({ message: "blog created", status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, status: "internalServerError" });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const { blogId, slug } = await req.query;
    let query = {};
    if (blogId) query.blogId = blogId;
    if (slug) query.slug = slug;

    const getBlogs = await blog.find(query);
    if (!getBlogs)
      return res
        .status(400)
        .json({ message: "blog does not found", status: "blogNotFound" });

    res
      .status(200)
      .json({ message: "blog fetched", blogs: getBlogs, status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, status: "internalServerError" });
  }
};
export const deleteBlogs = async (req, res) => {
  try {
    const { blogIdArr } = req.body; // Destructuring blogIdArr directly from req.query
    if (!blogIdArr || !Array.isArray(blogIdArr) || blogIdArr.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid blogIdArr", status: "badRequest" });
    }

    // Using the $in operator to find blogs whose IDs are in the blogIdArr
    const deleteResult = await blog.deleteMany({ blogId: { $in: blogIdArr } });

    // Checking if any blogs were deleted
    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({
        message: "No blogs found with provided IDs",
        status: "blogsNotFound",
      });
    }

    res
      .status(200)
      .json({ message: "Blogs deleted successfully", status: "success" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: error.message, status: "internalServerError" });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { updatedFields, blogId } = req.body; // Assuming the updated fields are sent in the request body

    // Ensure blogId is provided
    if (!blogId) {
      return res
        .status(400)
        .json({ message: "Blog ID is required", status: "badRequest" });
    }

    // Update the blog using findOneAndUpdate method
    const updatedBlog = await blog.findOneAndUpdate(
      { blogId: blogId }, // Filter by blogId
      { $set: updatedFields }, // Update with the provided fields
      { new: true } // Return the updated document
    );

    // Check if the blog was found and updated
    if (!updatedBlog) {
      return res
        .status(404)
        .json({ message: "Blog not found", status: "blogNotFound" });
    }

    res.status(200).json({
      message: "Blog updated successfully",
      blog: updatedBlog,
      status: "success",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: error.message, status: "internalServerError" });
  }
};
