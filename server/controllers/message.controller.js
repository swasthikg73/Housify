import prisma from "../configs/prisma.config.js";

export const getChats = async (req, res) => {
  try {
    const tokenUserId = req.userId;

    const chats = await prisma.chat.findMany({
      where: {
        usersIds: {
          hasSome: [tokenUserId],
        },
      },

      // include: {
      //   users: {
      //     select: {
      //       username: true,    We dont need to send both Users, needs to send only reciever
      //       avatar: true,
      //     },
      //   },
      // },
    });

    // console.log(chats);

    for (const chat of chats) {
      const receiverId = chat.usersIds.find((id) => id !== tokenUserId);

      const reciever = await prisma.user.findUnique({
        where: {
          id: receiverId,
        },
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      });

      chat.reciever = reciever;
    }
    return res.status(200).json({
      success: true,
      chats,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const getChat = async (req, res) => {
  try {
    const chatId = req.params.id;
    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
        usersIds: {
          hasSome: [req.userId],
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    if (!chat.seenBy.includes(req.userId)) {
      await prisma.chat.update({
        where: {
          id: chatId,
        },
        data: {
          seenBy: {
            push: [req.userId],
          },
        },
      });
    }
    return res.status(200).json({
      success: true,
      chat,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const createChat = async (req, res) => {
  try {
    const tokenUser = req.userId;

    const chat = await prisma.chat.create({
      data: {
        usersIds: [tokenUser, req.body.receiverId],
      },
    });

    return res.status(201).json({
      success: true,
      chat,
    });
  } catch (error) {
    console.log(error);
    console.log(
      "------------------------------------------------------------------------"
    );

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const readChat = async (req, res) => {
  try {
    const userId = req.userId;
    const chatId = req.params.id;

    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
        usersIds: {
          hasSome: [userId],
        },
      },
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    if (!chat.seenBy.includes(userId)) {
      await prisma.chat.update({
        where: {
          id: chat.id,
        },
        data: {
          seenBy: {
            push: [userId],
          },
        },
      });
    }
    return res.status(200).json({
      success: true,
      chat,
      message: "Chat updated successfully..!",
    });
  } catch (error) {
    console.log(error);
    console.log(
      "------------------------------------------------------------------------"
    );
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const addMessage = async (req, res) => {
  try {
    const tokenUserId = req.userId;
    const chatId = req.params.chatId;
    const text = req.body.text;

    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
        usersIds: {
          hasSome: [tokenUserId],
        },
      },
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found !",
      });
    }

    const message = await prisma.messages.create({
      data: {
        text,
        chatId,
        userId: tokenUserId,
      },
    });

    if (!chat.seenBy.includes(tokenUserId)) {
      await prisma.chat.update({
        where: {
          id: chat.id,
        },
        data: {
          seenBy: { push: [tokenUserId] },
        },
      });
    }

    return res.status(201).json({
      success: true,
      message,
    });
  } catch (error) {
    console.log(error);
    console.log(
      "----------------------------------------------------------------"
    );
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
