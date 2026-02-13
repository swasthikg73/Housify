import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";

export const SocketContext = createContext();

export const SocketcontextProvier = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const { CurrentUser } = useContext(AuthContext);

  useEffect(() => {
    console.log("Socket Provider Mounted");

    const newSocket = io("http://localhost:4000");

    setSocket(newSocket);

    return () => {
      console.log("Socket Provider Unmounted");
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    CurrentUser && socket?.emit("newUser", CurrentUser.id);
  }, [CurrentUser, socket]);

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  );
};
