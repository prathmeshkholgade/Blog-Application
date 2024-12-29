const express = require("express");
const User = require("../models/userSchema");
const ExpressError = require("../utils/ExpressError");
const { storage, cloudinary } = require("../config/cloudConfig");
const multer = require("multer");
const upload = multer({ storage });
const { verifyUser } = require("../middleware/middleware");
const Post = require("../models/postSchema");
const router = express.Router();

router.post("/add",verifyUser, upload.single("image"), async (req, res, next) => {
  const { title, content } = req.body;
  console.log(req.body);
  console.log(req.file);
  console.log(req.user);

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
});

router.get("/posts", async (req, res, next) => {
  const allPost = await Post.find().populate("author");
  res.status(200).json(allPost);
});
router.get("/posts/:id", async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findById(id).populate("author");
  console.log(post);
  res.status(200).json(post);
});

module.exports = router;
