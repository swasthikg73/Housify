import express from "express";
import {
  login,
  logout,
  register,
  CheckIsAdmin,
} from "../controllers/auth.controller.js";

import verifyToken from "../middleware/auth.middleware.js";
const authRouter = express.Router();

authRouter.post("/login", login);

authRouter.post("/register", register);

authRouter.post("/logout", logout);

authRouter.post("/isAdmin", verifyToken, CheckIsAdmin);

// authRouter.get("/test-token", verifyToken, (req, res) => {
//   try {
//     console.log(req.userId);

//     res.status(200).json({ success: true, message: "Auth Middleware Working" });
//   } catch (error) {
//     res.status(500).json({ success: true, message: error.message });
//   }
// });

export default authRouter;
