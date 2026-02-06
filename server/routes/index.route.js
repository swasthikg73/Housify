import express from "express";
import authRouter from "./auth.route.js";
import postsRouter from "./posts.route.js";
import userRouter from "./user.route.js";

const indexRouter = express.Router();

indexRouter.use("/auth", authRouter);
indexRouter.use("/post", postsRouter);
indexRouter.use("/user", userRouter);

export default indexRouter;
