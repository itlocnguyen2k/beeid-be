import express from "express";
import { taskCreateController, taskDeleteController, taskDetailController, taskListController, taskUpdateController } from "../controllers/task.controllers";
import verifyAccessToken from "../middlewares/verifyAccessToken.middlewares";
import verifyUploadTypeImage from "../middlewares/verifyUploadTypeImage.middlewares";

const taskRoutes = express.Router();

taskRoutes.post("/list", verifyAccessToken, taskListController);
taskRoutes.post("/create", verifyAccessToken, verifyUploadTypeImage.single("file"), taskCreateController);
taskRoutes.post("/detail", verifyAccessToken, taskDetailController);
taskRoutes.post("/update", verifyAccessToken, verifyUploadTypeImage.single("file"), taskUpdateController);
taskRoutes.post("/delete", verifyAccessToken, taskDeleteController);

export default taskRoutes;
