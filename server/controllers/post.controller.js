import prisma from "../configs/prisma.config.js";

export const getPosts = async (req, res) => {
  try {
    const query = req.query;
    const posts = await prisma.post.findMany({
      where: {
        city: query?.city || undefined,
        type: query?.type || undefined,
        location: query?.location || undefined,
        property: query?.property || undefined,
        bedroom: query?.bedroom || undefined,
        price: {
          gte: query.min ? parseInt(query.min) : 0,
          lte: query.max ? parseInt(query.max) : 100000000000,
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

    return res.status(200).json({
      success: true,
      post: post,
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
