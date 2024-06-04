import express from "express";
import { trashListController, trashRestoreController } from "../controllers/trash.controllers";
import { verifyAccessToken } from "../middlewares/middlewares";

const trashRoutes = express.Router();

trashRoutes.post("/list", verifyAccessToken, trashListController);
trashRoutes.post("/restore", verifyAccessToken, trashRestoreController);

export default trashRoutes;
