import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";

import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/", verifyToken, getAllUsers);

userRouter.get("/:id", verifyToken, getUser);

userRouter.put("/update/:id", verifyToken, updateUser);

userRouter.delete("/delete/:id", verifyToken, deleteUser);

export default userRouter;
