import express from "express";
import { homeListController, homeSprintListController, homeTaskListController } from "../controllers/home.controllers";
import verifyAccessToken from "../middlewares/verifyAccessToken.middlewares";

const homeRoutes = express.Router();

homeRoutes.post("/list", verifyAccessToken, homeListController);
homeRoutes.post("/sprint-list", verifyAccessToken, homeSprintListController);
homeRoutes.post("/task-list", verifyAccessToken, homeTaskListController);

export default homeRoutes;
