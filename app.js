import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import path from "path";
import morgan from "morgan";
import { createStream } from "rotating-file-stream";
import initRoutes from "./src/routes/init.routes";
import database from "./src/configs/db.configs";
import log from "./src/logs/log";
import cron from "node-cron";
import { deleteObject } from "./src/cron/trash.cron";
import { reportEveryDay } from "./src/cron/report.cron";
import { CRON_TAB_AT_0_0 } from "./src/constant/cron";
import { hashSyncPassword } from "./src/utils/password.utils";

dotenv.config();

const port = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV === "production";

const app = express();
app.use(helmet({ crossOriginResourcePolicy: false }));

const accessLogStream = createStream("access.log", {
  interval: "1d",
  path: path.join(__dirname, "log"),
});
app.use(isProduction ? morgan("combined", { stream: accessLogStream }) : morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/src/public/image", express.static(path.join(__dirname, "/src/public/image")));

const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: process.env.FRONTEND,
    methods: ["GET", "POST"],
  },
});

//30 0-59 * * * *

cron.schedule(CRON_TAB_AT_0_0, () => {
  console.log("--------------------------------------------------");
  console.log("Delete ...: " + new Date());
  console.log("--------------------------------------------------");
  deleteObject();
});

cron.schedule(CRON_TAB_AT_0_0, () => {
  console.log("--------------------------------------------------");
  console.log("Report ...: " + new Date());
  console.log("--------------------------------------------------");
  reportEveryDay();
});

io.on("connection", (socket) => {
  socket.on("send_message", () => {
    socket.broadcast.emit("receive_message");
  });
  socket.on("send_notification", (reciever) => {
    socket.broadcast.emit("receive_notification", reciever._id);
  });
  socket.on("send_request_friend", (reciever) => {
    socket.broadcast.emit("receive_request_friend", reciever);
  });

  socket.on("disconnect", () => {
    console.log("Disconnect ...");
  });
});

console.log(hashSyncPassword("12345678"))

http.listen(port, () => {
  log.info(`Server running port ${port}`);
  database.connectDatabase();
  initRoutes(app);
});
