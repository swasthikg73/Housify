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
  const Avatar = req.body.avatar;
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

    const updateduser = await prisma.user.update({
      where: { id },
      data: {
        ...inputs,
        ...(hashedPassowrd && { password: hashedPassowrd }),
        ...(Avatar && { avatar: Avatar }),
      },
    });

    const { password: userPassword, ...updatedUser } = updateduser;

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
  const tokenId = req.userId;

  if (tokenId != req.params.id) {
    return res.status(500).json({
      success: false,
      message: "Unauthorized to perform this action",
    });
  }
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

export const savePost = async (req, res) => {
  try {
    const userId = req.userId;
    const postId = req.params.id;

    const savedPost = await prisma.savedPost.findUnique({
      where: {
        userId_postId: {
          userId: userId,
          postId: postId,
        },
      },
    });

    if (savedPost) {
      await prisma.savedPost.delete({
        where: {
          id: savedPost.id,
        },
      });

      return res.status(200).json({
        success: true,
        message: "Post removed from Saved list",
      });
    } else {
      const savedPost = await prisma.savedPost.create({
        data: { userId, postId },
      });
      return res.status(201).json({
        success: true,
        message: "Post saved successfully",
        savedPost,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const profilePageLists = async (req, res) => {
  try {
    const userId = req.userId;
    const savedPosts = await prisma.savedPost.findMany({
      where: {
        userId,
      },
      include: {
        post: true,
      },
    });
    const userPosts = await prisma.post.findMany({
      where: {
        userId: userId,
      },
      include: {
        postDetail: true,
      },
    });

    return res.status(200).json({
      success: true,
      myPosts: userPosts,
      savedPosts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const getNotifictionCount = async (req, res) => {
  try {
    const tokenUserId = req.userId;

    const number = await prisma.chat.count({
      where: {
        usersIds: {
          hasSome: [tokenUserId],
        },

        NOT: {
          seenBy: {
            hasSome: [tokenUserId],
          },
        },
      },
    });

    res.status(200).json({ number });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
