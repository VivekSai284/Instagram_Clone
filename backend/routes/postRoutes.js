const express = require("express");
const Post = require("../models/Post");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      const post = new Post({
        user: req.user.id,
        image: req.file.filename,
        caption: req.body.caption,
      });

      await post.save();

      res.status(200).json({
        message: "Posted Successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
);

router.get("/", async (req, res) => {
  try {
    const post = await Post.find().populate("user", "username").sort({
      createdAt: -1,
    });
    res.json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
