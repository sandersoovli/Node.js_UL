import express from "express";
import dotenv from "dotenv";
import postsRouter from "./routes/posts.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static files
app.use(express.static("public"));

// Routes
app.use("/api/posts", postsRouter);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
