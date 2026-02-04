import prisma from "../configs/prisma.config.js";
import bcrypt from "bcrypt";

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    const { password, ...Users } = users;

    res.status(200).json({
      success: true,
      Users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get Users",
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const { password, ...User } = user;

    return res.status(200).json({
      success: true,
      User,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get User",
    });
  }
};

export const updateUser = async (req, res) => {
  const tokenUserId = req.userId;
  const id = req.params.id;
  const { password, ...inputs } = req.body;

  try {
    let hashedPassowrd = null;

    if (password) {
      const salt = bcrypt.genSaltSync(10);
      hashedPassowrd = bcrypt.hashSync(password, salt);
    }

    if (tokenUserId != id) {
      return res.status(500).json({
        success: false,
        message: "Not authorized",
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...inputs,
        ...(hashedPassowrd && { password: hashedPassowrd }),
      },
    });

    return res.status(200).json({
      success: true,
      message: "User updated succesfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update User",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await prisma.user.delete({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).json({
      success: true,
      message: "User deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete User",
    });
  }
};
