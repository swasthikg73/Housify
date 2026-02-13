import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import {
  addMessage,
  createChat,
  getChat,
  getChatbyPost,
  getChats,
  readChat,
} from "../controllers/message.controller.js";

const messageRouter = express.Router();
messageRouter.get("/getChatbyPost/:id", verifyToken, getChatbyPost);

messageRouter.get("/", verifyToken, getChats);
messageRouter.get("/:id", verifyToken, getChat);
messageRouter.post("/create", verifyToken, createChat);
messageRouter.put("/read/:id", verifyToken, readChat);
messageRouter.post("/addMessage/:chatId", verifyToken, addMessage);

export default messageRouter;
