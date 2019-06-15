import socketIo from "socket.io";
import http from "http";
import messageController from "./controller/message";

export = (socketServer: http.Server) => {
  const io = socketIo(socketServer);

  io.on("connection", socket => {
    socket.on("login", function(data) {
      socket.join(data.email);
    });
    socket.on("sendMessage", function(data) {
      socket.to(data.email).emit("getMessage", data.text);
      messageController.save(data);
    });
  });
};
