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



router.get('/search/:keyword', async(req, res) => {
  try{
    const users = await User.find({
      username : {
        $regex : req.params.keyword,
        $options : "i",
      },
    }).select("username fullname profilePic")

    res.json(users)
  }catch(error){
    res.status(500).json({
      message : error.message
    })
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

router.get("/:userId", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not Found",
      });
    }

    const isFollowing = user.followers.some((id) => id.toString() === req.user.id);

    res.json({
      ...user.toObject(),
      isFollowing,
    });
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

    const isFollowing = currentUser.following.some((id) => id.toString() === targetUserId);

    if (isFollowing) {
      currentUser.following = currentUser.following.filter(
        (id) => id.toString() !== targetUserId,
      );

      targetUser.followers = targetUser.followers.filter(
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




router.put('/edit-profile', authMiddleware, upload.single("image"), async(req, res) => {
  try{
    const { profilePic, fullname, username, bio } = req.body;

    const user = await User.findById(req.user.id);

    if(!user){
      return res.status(404).json({
        message : "User Not Found",
      });
    }

    user.profilePic = profilePic || req.file.filename;
    user.fullname = fullname || user.fullname;
    user.username = username || user.username;
    user.bio = bio || user.bio;

    await user.save()

    res.json({
      message : "Profile Updated"
    })
  }catch(error){
    res.status(500).json({
      message : error.message
    })
  }
})





module.exports = router;
