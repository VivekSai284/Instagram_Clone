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
    const post = await Post.find().populate("user", "username profilePic").sort({
      createdAt: -1,
    });
    res.json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/:id/like", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(400)({
        message: "Post not Found",
      });
    }

    const alreadyLiked = post.likes.some(
      (id) => id && id.toString() === userId,
    );
    if (alreadyLiked) {
      post.likes = post.likes.filter((id) => id && id.toString() !== userId);
      await post.save();

      return res.status(200).json({
        message: "Post Unliked",
      });
    }

    post.likes.push(userId);

    await post.save();

    res.status(200).json({
      message: "Post Liked",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


router.get('/my-posts', authMiddleware, async(req, res) => {
  try{
    const post = await Post.find({
      user : req.user.id
    }).populate("user", "username fullname").sort({createdAt: -1})

    res.status(201).json(post)

  }catch(error){
    res.status(500).json({
      message : error.message
    })
  }
});



module.exports = router;
