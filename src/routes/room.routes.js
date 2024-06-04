import express from "express";
import { roomCreateController, roomListController, roomUpdateController } from "../controllers/room.controllers";
import verifyAccessToken from "../middlewares/verifyAccessToken.middlewares";

const roomRoutes = express.Router();

roomRoutes.post("/list", verifyAccessToken, roomListController);
roomRoutes.post("/create", verifyAccessToken, roomCreateController);
roomRoutes.post("/update", verifyAccessToken, roomUpdateController);

export default roomRoutes;