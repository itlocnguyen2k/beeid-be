import express from "express";
import { fileDeleteController, fileDownloadController } from "../controllers/file.controllers";
import verifyAccessToken from "../middlewares/verifyAccessToken.middlewares";

const fileRoutes = express.Router();

fileRoutes.post("/download", verifyAccessToken, fileDownloadController);
fileRoutes.post("/delete", verifyAccessToken, fileDeleteController);

export default fileRoutes;
