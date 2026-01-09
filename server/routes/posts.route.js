import express from "express";

const postsRouter = express.Router();

postsRouter.get("/", (req, res) => {
  res.send("Get all posts");
});

export default postsRouter;
