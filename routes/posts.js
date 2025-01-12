import express from "express";

const router = express.Router();

let posts = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
  { id: 3, title: "Post 3" },
];

// Get all posts
router.get("/", (req, res) => {
  res.status(200).json(posts);
});

// Get a single post by ID
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(post => post.id === id);
  if (!post) {
    return res.status(404).json({ message: `Post with ID ${id} not found` });
  }
  res.status(200).json(post);
});

// Create a new post
router.post("/", (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Please include a title" });
  }
  const newPost = { id: posts.length + 1, title };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// Update a post by ID
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title } = req.body;
  const post = posts.find(post => post.id === id);
  if (!post) {
    return res.status(404).json({ message: `Post with ID ${id} not found` });
  }
  if (!title) {
    return res.status(400).json({ message: "Please include a title" });
  }
  post.title = title;
  res.status(200).json(post);
});

// Delete a post by ID
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex(post => post.id === id);
  if (index === -1) {
    return res.status(404).json({ message: `Post with ID ${id} not found` });
  }
  posts.splice(index, 1);
  res.status(200).json({ message: `Post with ID ${id} deleted` });
});

export default router;
