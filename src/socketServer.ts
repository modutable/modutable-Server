import socketIo from "socket.io";
import http from "http";
import messageController from "./controller/message";

export = (socketServer: http.Server) => {
  const io = socketIo(socketServer);

  io.on("connection", socket => {
    socket.on("login", function(data) {
      socket.join(data.email);
      console.log(data);
    });
    socket.on("sendMessage", function(data) {
      /* data => {to: '', from:'', message} */
      socket.to(data.to).emit("getMessage", data.message);
      messageController.save(data);
    });
  });
};
