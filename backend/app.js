require("dotenv").config();
const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
const mongoose = require("./config/database");
const cookieParser = require("cookie-parser");
const User = require("./models/userSchema");
const ExpressError = require("./utils/ExpressError");
const { verifyUser } = require("./middleware/middleware");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["PATCH", "GET", "POST", "DELETE", "PUT"], // Ensure PATCH is included here
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "pragma",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/user", userRoutes);
app.use("/blog", postRoutes);

app.use((err, req, res, next) => {
  const { status = 500, message = "some thing went wrong" } = err;
  res.status(status).json(message);
});

app.listen(port, () => {
  console.log(`server is runing on ${port}`);
});
