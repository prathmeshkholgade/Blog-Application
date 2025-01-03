const express = require("express");
const User = require("../models/userSchema");
const ExpressError = require("../utils/ExpressError");
const { storage, cloudinary } = require("../config/cloudConfig");
const multer = require("multer");
const upload = multer({ storage });
const { verifyUser } = require("../middleware/middleware");
const Post = require("../models/postSchema");
const WrapAsync = require("../utils/WrapAsync");
const {
  updatePost,
  createPost,
  deletePost,
  siglePostDetails,
  allPost,
} = require("../controllers/postControllers");
const router = express.Router();

router.put("/posts/edit/:id", upload.single("image"), WrapAsync(updatePost));

router.post("/add", verifyUser, upload.single("image"), WrapAsync(createPost));

router.get("/posts", allPost);

router.get("/posts/:id", WrapAsync(siglePostDetails));

router.delete("/posts/:id", verifyUser, WrapAsync(deletePost));

module.exports = router;
