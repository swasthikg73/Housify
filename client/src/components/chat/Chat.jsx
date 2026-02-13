import "./Chat.scss";
import { assets } from "../../assets/assets.js";
import { AuthContext } from "../../context/AuthContext";
import { format } from "timeago.js";

import { useContext, useEffect, useRef, useState } from "react";
import apiRequest from "../../lib/apiRequest.js";
import { SocketContext } from "../../context/SocketContext.jsx";
import { useNotificationStore } from "../../lib/NotificationCounts.js";

const Chat = ({ chats }) => {
  const [chat, setChat] = useState(null);
  const { CurrentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const bottomref = useRef(null);

  const decrease = useNotificationStore((state) => state.decrease);

  const [chatList, setChatList] = useState(chats);

  useEffect(() => {
    setChatList(chats);
  }, [chats]);

  useEffect(() => {
    bottomref.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.chat?.messages]);

  const handleOpenChat = async (id, reciever) => {
    try {
      const Chat = await apiRequest.get("/chat/" + id);
      setChat({ ...Chat.data, reciever });
      decrease();
    } catch (error) {
      console.log(error.message);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const text = formdata.get("text");
    if (!text) {
      return;
    }
    try {
      const res = await apiRequest.post("/chat/addMessage/" + chat.chat.id, {
        text,
      });
      setChat((prev) => ({
        ...prev,
        chat: {
          ...prev.chat,
          messages: [...(prev.chat.messages || []), res.data.message],
        },
      }));

      setChatList((prev) =>
        prev.map((c) =>
          c.id === chat.chat.id ? { ...c, lastMessage: text } : c
        )
      );
      e.target.reset();

      socket.emit("sendMessage", {
        recieverId: chat?.reciever?.id,
        data: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (data) => {
      const newMessage = data.message;

      //  Update open chat messages (if this chat is open)
      setChat((prev) => {
        if (!prev) return prev;

        if (prev.chat.id !== newMessage.chatId) return prev;

        return {
          ...prev,
          chat: {
            ...prev.chat,
            messages: [...(prev.chat.messages || []), newMessage],
          },
        };
      });

      //  Update sidebar lastMessage ALWAYS
      setChatList((prev) => {
        const updated = prev.map((c) =>
          c.id === newMessage.chatId
            ? { ...c, lastMessage: newMessage.text }
            : c
        );

        // Optional: Move updated chat to top (like WhatsApp)
        const current = updated.find((c) => c.id === newMessage.chatId);
        const others = updated.filter((c) => c.id !== newMessage.chatId);

        return current ? [current, ...others] : updated;
      });
    };

    socket.on("getMessage", handleMessage);

    return () => {
      socket.off("getMessage", handleMessage);
    };
  }, [socket]);

  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        {chatList &&
          chatList?.map((c, index) => (
            <div
              key={index}
              onClick={() => handleOpenChat(c?.id, c?.reciever)}
              className="message"
              style={{
                backgroundColor:
                  c?.seenBy.includes(CurrentUser?.id) || c.id === chat?.chat?.id
                    ? "white"
                    : "#fecd514e",
              }}>
              <img src={c?.reciever?.avatar || assets?.user} alt="userImage" />
              <span>{c?.reciever?.username}</span>
              <p>{c?.lastMessage}</p>
            </div>
          ))}
      </div>

      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img src={chat?.reciever?.avatar || assets.user} alt="" />
              <span>{chat?.reciever?.username}</span>
            </div>
            <span className="close" onClick={() => setChat(false)}>
              X
            </span>
          </div>

          <div className="center">
            {chat?.chat?.messages?.map((message, index) => (
              <div
                key={index}
                className="chatMessage"
                style={{
                  alignSelf:
                    message?.userId === CurrentUser?.id
                      ? "flex-end"
                      : "flex-start",
                  textAlign:
                    message?.userId === CurrentUser?.id ? "right" : "left",
                }}>
                <p>{message?.text}</p>
                <span>{format(message?.createdAt)}</span>
              </div>
            ))}

            <div ref={bottomref}></div>
          </div>
          <form onSubmit={sendMessage} className="bottom">
            <textarea name="text" id="text"></textarea>
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chat;
