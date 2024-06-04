import express from "express";
import { logListController } from "../controllers/log.controllers";
import verifyAccessToken from "../middlewares/verifyAccessToken.middlewares";

const logRoutes = express.Router();

logRoutes.post("/list", verifyAccessToken, logListController);

export default logRoutes;