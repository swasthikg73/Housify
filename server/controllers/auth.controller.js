import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../configs/prisma.config.js";
import { log } from "node:console";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  //Hash the password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassowrd = bcrypt.hashSync(password, salt);

  //Check User Exits
  const existingEmail = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  //Check User Exits
  const existingUsername = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassowrd,
      email,
    },
  });

  try {
    res
      .status(201)
      .json({ success: true, message: "User registered successfully", user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //Check User Exits
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });

    //Check the passowrd

    const isPasswordCorrect = await bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect)
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });

    //Generate JWT token
    const token = jwt.sign(
      { id: user.id, isAdmin: false },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "8d",
      }
    );

    // res.setHeader("Set-Cookie", "My Name=" + "Value here").json("Success"); Setting cookie manually

    //Setting cookie with cookie-parser
    res.cookie("access-token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, //7 day
    });

    return res
      .status(200)
      .json({ success: true, message: "User logged in successfully", user });
  } catch (error) {
    log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("access-token");
    return res
      .status(200)
      .json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const CheckIsAdmin = async (req, res) => {
  try {
    const token = req.cookies["access-token"];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not authenticated" });
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (error, payload) => {
      if (error)
        return res
          .status(401)
          .json({ success: false, message: "Not authenticated" });
      if (!payload.isAdmin)
        return res
          .status(403)
          .json({ success: false, message: "You are not authorized" });

      return res.status(200).json({ success: true, message: "You are admin" });
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
