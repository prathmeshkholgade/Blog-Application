const express = require("express");
const User = require("../models/userSchema");
const ExpressError = require("../utils/ExpressError");
const { storage, cloudinary } = require("../config/cloudConfig");
const multer = require("multer");
const upload = multer({ storage });
const { verifyUser } = require("../middleware/middleware");
const Post = require("../models/postSchema");
const WrapAsync = require("../utils/WrapAsync");
const router = express.Router();

router.put(
  "/posts/edit/:id",
  upload.single("image"),
  WrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const { title, content } = req.body;

    const image = req.file;
    console.log("this is img data", image);
    // if (!title && !content && !image) {
    //   return res.status(400).json({ message: "No fields to update" });
    // }
    const existingPost = await Post.findById(id);
    if (!existingPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        ...(title && { title }), // Update title if provided
        ...(content && { content }), // Update content if provided
        ...(image && { image: { url: image.path, fileName: image.filename } }), // Update image if provided
      },
      { new: true }
    );
    console.log(updatedPost);
    res.status(200).json({ message: "Post updated successfully", updatedPost });
  })
);

router.post(
  "/add",
  verifyUser,
  upload.single("image"),
  async (req, res, next) => {
    const { title, content } = req.body;
    // console.log(req.body);
    // console.log(req.file);
    // console.log(req.user);

    const newPost = new Post({
      title: title,
      content: content,
      image: {
        url: req.file.path,
        fileName: req.file.filename,
      },
      author: req.user._id,
    });
    const response = await newPost.save();
    res.status(200).json(response);
    console.log(response);
  }
);

router.get("/posts", async (req, res, next) => {
  const allPost = await Post.find().populate("author");
  res.status(200).json(allPost);
});
router.get("/posts/:id", async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findById(id).populate("author");

  res.status(200).json(post);
});

router.delete(
  "/posts/:id",
  verifyUser,
  WrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return next(new ExpressError(500, "post not found"));
    }
    //  Ensure the logged-in user is the author of the post
    if (post.author.toString() !== req.user._id.toString()) {
      return next(
        new ExpressError(403, "You are not authorized to delete this post")
      );
    }
    const deletedpost = await Post.findByIdAndDelete(id);

    console.log(deletedpost);
    res.status(200).json({ message: "Deleted successfully" });
  })
);

module.exports = router;
