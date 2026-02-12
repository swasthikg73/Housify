import prisma from "../configs/prisma.config.js";
import jwt from "jsonwebtoken";

export const getPosts = async (req, res) => {
  try {
    const query = req.query;
    // console.log(
    //   "---------------------------------------------------------------------------------------"
    // );

    // console.log("Query :", query);

    const posts = await prisma.post.findMany({
      where: {
        city: query?.city
          ? {
              contains: query?.city,
              mode: "insensitive",
            }
          : undefined,
        type: query?.type || undefined,
        address: query?.location
          ? {
              contains: query?.location,
              mode: "insensitive",
            }
          : undefined,
        property: query?.property || undefined,
        bedroom: query?.bedroom ? parseInt(query.bedroom) : undefined,
        price: {
          gte: query.minPrice ? parseInt(query.minPrice) : 0,
          lte: query.maxPrice ? parseInt(query.maxPrice) : 100000000000,
        },
      },
    });

    if (!posts) {
      return res.status(200).json({
        success: true,
        posts: "No posts found",
      });
    }

    return res.status(200).json({
      success: true,
      posts: posts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get posts",
    });
  }
};

export const getPost = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });

    let userId;
    const token = req?.cookies["access-token"];
    if (!token) {
      userId = null;
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (error, payload) => {
      if (error) {
        return res.status(401).json({
          success: false,
          message: "Invalid Token",
        });
      }
      userId = payload?.id;
    });

    const saved = await prisma.savedPost.findUnique({
      where: {
        userId_postId: {
          userId,
          postId: id,
        },
      },
    });

    return res.status(200).json({
      success: true,
      post: post,
      isSaved: saved ? true : false,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get post",
    });
  }
};

export const addPost = async (req, res) => {
  try {
    const tokenUserId = req.userId;
    const postData = req.body.postData;

    const post = await prisma.post.create({
      data: {
        ...postData,
        userId: tokenUserId,
        postDetail: {
          create: req.body.postDetail,
        },
      },
    });

    return res.status(201).json({
      success: true,
      post,
      message: "Post added successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to add post",
    });
  }
};

export const updatePost = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update post",
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const tokenUserId = req.userId;
    const id = req.params.id;

    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });

    if (tokenUserId != post.userId) {
      return res.status(403).json({
        success: false,
        message: "Not Authorized!",
      });
    }
    await prisma.post.delete({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete post",
    });
  }
};
