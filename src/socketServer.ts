import socketIo from "socket.io";
import http from "http";
import messageController from "./controller/message";
import { check } from "./middleware/tokenparser";

export = (socketServer: http.Server) => {
  const io = socketIo(socketServer);

  io.on("connection", socket => {
    socket.on("login", async function(data) {
      const userInfo: any = await check(data.token);
      socket.join(userInfo.email);
    });
    socket.on("sendMessage", async function(data) {
      const info = await check(data.token);
      socket
        .to(data.email)
        .emit("getMessage", { text: data.text, userInfo: info });
      messageController.save(data);
    });
  });
};
