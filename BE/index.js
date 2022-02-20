require("dotenv").config();
const port = process.env.PORT;
const hostname = process.env.HOST;

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const route = require("./src/routes/index.route");
const fileUpload = require("express-fileupload");
const logger = require("morgan");
const passport = require("passport");

const io = require("socket.io")(server, {
  cors: {
    origins: ["http://localhost:8080"],
  },
});

//Database connection
const db = require("./src/configs/database");

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // f
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:8080"],
    exposedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/uploads", express.static("src/uploads"));
app.use(fileUpload());
app.use(passport.initialize());
app.use(logger("dev"));

try {
  db.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

route(app);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("my message", (msg) => {
    io.emit("my broadcast", `server: ${msg}`);
  });

  socket.on("moveMap", (msg) => {
    io.emit("move", "socket move map");
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("my message", (msg) => {
    console.log("message: " + msg);
  });
});

server.listen(port, () => {
  console.log(`Example app listening at http://${hostname}:${port}`);
});
