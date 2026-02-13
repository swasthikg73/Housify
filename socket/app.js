import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});

let onlineUsers = [];

//Remove User
const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

//getUser
const getUser = (userId) => {
  return onlineUsers.find((user) => user.userId === userId);
};

//Add user into Online
const addOnlineUser = (userId, socketId) => {
  let userExists = onlineUsers.find((user) => user.userId === userId);

  if (userExists) {
    userExists.socketId = socketId; //If the same user reconnects (refreshes page), they may get a new socketId. ,Incase of new or update socketId
  } else {
    onlineUsers.push({ userId, socketId });
    console.log("Users : ", onlineUsers);
  }
};

io.on("connection", (socket) => {
  console.log("User connected :", socket.id);

  //Add User
  socket.on("newUser", (userId) => {
    addOnlineUser(userId, socket.id);
  });

  //Send Messages
  socket.on("sendMessage", ({ recieverId, data }) => {
    console.log("Send Message recieved");
    console.log(" Recieved Id : ", recieverId);

    const receiver = getUser(recieverId);
    console.log("Found reciever: ", receiver);

    if (receiver) {
      console.log("Emitting to SocketId : ", receiver.socketId);
      io.to(receiver.socketId).emit("getMessage", data);
    }
  });

  //Disconnect socket
  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

io.listen(4000);
