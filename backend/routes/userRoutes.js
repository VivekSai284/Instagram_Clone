const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const User = require("../models/User");
const Post = require("../models/Post");
const router = express.Router();

router.put(
  "/profile-pic",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return res.status(404).json({
          message: "User not Found",
        });
      }

      user.profilePic = req.file.filename;

      await user.save();

      res.status(200).json({
        message: "Profic pic updated",
        profilePic: user.profilePic,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
);

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/:userId/posts", async (req, res) => {
  try {
    const post = await Post.find({
      user: req.params.userId,
    })
      .populate("user", "fullname profilePic")
      .sort({ createdAt: -1 });

    res.json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not Found",
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/follow/:userId", authMiddleware, async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const targetUserId = req.params.userId;

    const currentUser = await User.findById(currentUserId);
    const targetUser = await User.findById(targetUserId);


    if(!targetUser){
        return res.status(404).json({
            message : "User Not Found"
        })
    }

    const isFollowing = currentUser.following.includes(targetUserId);

    if (isFollowing) {
      currentUser.following = currentUser.following.filter(
        (id) => id.toString() !== targetUserId,
      );

      targetUser.following = targetUser.followers.filter(
        (id) => id.toString() !== currentUserId
      );


      await currentUser.save()
      await targetUser.save()


      return res.json({
        message: "Unfollowed",
        following : false
      })
    }

    currentUser.following.push(targetUserId);
    targetUser.followers.push(currentUserId);


    await currentUser.save()
    await targetUser.save()

    res.json({
        message : "Followed",
        following: true
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
