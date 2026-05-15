import express from "express";
import Post from "../models/Post.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

// ============ GET ALL POSTS ============
// GET /api/posts  (public)
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name email avatar")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ============ GET SINGLE POST ============
// GET /api/posts/:id  (public)
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "name email avatar"
    );
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ============ CREATE POST ============
// POST /api/posts  (token)
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, description, imageUrl } = req.body;

    if (!title || !description || !imageUrl) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const post = await Post.create({
      title,
      description,
      imageUrl,
      author: req.user.id,
    });

    await post.populate("author", "name email avatar");

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ============ UPDATE POST ============
// PATCH /api/posts/:id 
router.patch("/:id", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { title, description, imageUrl } = req.body;

    if (title) post.title = title;
    if (description) post.description = description;
    if (imageUrl) post.imageUrl = imageUrl;

    await post.save();
    await post.populate("author", "name email avatar");


    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ============ DELETE POST ============
// DELETE /api/posts/:id 
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
