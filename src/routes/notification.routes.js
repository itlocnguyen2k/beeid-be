import express from "express";
import {
  notificationListController,
  notificationReadAllController,
  notificationReadController,
} from "../controllers/notification.controllers";
import { verifyAccessToken } from "../middlewares/middlewares";
import verifyRequest from "../middlewares/verifyRequest.middlewares";
import { notificationSchema } from "../schema/notification/notification.schema";

const notificationRoutes = express.Router();

notificationRoutes.post("/list", verifyAccessToken, verifyRequest(notificationSchema), notificationListController);
notificationRoutes.post("/read", verifyAccessToken, verifyRequest(notificationSchema), notificationReadController);
notificationRoutes.post("/read-all", verifyAccessToken, notificationReadAllController);

export default notificationRoutes;
