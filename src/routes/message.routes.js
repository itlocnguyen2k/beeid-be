import express from "express";
import { messageCreateController, messageListController, messageUpdateController } from "../controllers/message.controllers";
import verifyAccessToken from "../middlewares/verifyAccessToken.middlewares";
import verifyUploadFile from "../middlewares/verifyUploadFile.middlewares";

const messageRoutes = express.Router();

messageRoutes.post("/list", verifyAccessToken, messageListController);
messageRoutes.post("/create", verifyAccessToken, verifyUploadFile.array("files", 10), messageCreateController);
messageRoutes.post("/update", verifyAccessToken, messageUpdateController);

export default messageRoutes;
