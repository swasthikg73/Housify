import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";

import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/post.controller.js";
const postsRouter = express.Router();

postsRouter.get("/", getPosts);
postsRouter.get("/:id", getPost);
postsRouter.post("/add", verifyToken, addPost);
postsRouter.put("/update/:id", verifyToken, updatePost);
postsRouter.delete("/delete/:id", verifyToken, deletePost);

export default postsRouter;
