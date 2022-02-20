function socket(io) {
  io.on("connection", (socket) => {
    // socket.on("disconnect", () => {
    //   console.log("disconnected");
    //   io.emit("noOfConnections", Object.keys(io.sockets.connected).length);
    // });
    // socket.on("chat-message", (msg) => {
    //   socket.broadcast.emit("chat-message", msg);
    // });
    // socket.on("joined", (name) => {
    //   socket.broadcast.emit("joined", name);
    // });
    // socket.on("leaved", (name) => {
    //   socket.broadcast.emit("leaved", name);
    // });
    // socket.on("typing", (data) => {
    //   socket.broadcast.emit("typing", data);
    // });
    // socket.on("stoptyping", () => {
    //   socket.broadcast.emit("stoptyping");
    // });
  });
}

module.exports = socket;
