import express from "express";
import { reportDownloadController, reportListController } from "../controllers/report.controllers";
import { verifyAccessToken } from "../middlewares/middlewares";

const reportRoutes = express.Router();

reportRoutes.post("/list", verifyAccessToken, reportListController);
reportRoutes.post("/download", verifyAccessToken, reportDownloadController);

export default reportRoutes;
