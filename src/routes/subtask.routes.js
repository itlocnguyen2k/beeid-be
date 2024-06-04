import express from "express";
import {
  subTaskCreateController,
  subTaskDeleteController,
  subTaskDetailController,
  subTaskListController,
  subTaskUpdateController,
} from "../controllers/subtask.controllers";
import verifyAccessToken from "../middlewares/verifyAccessToken.middlewares";
import verifyUploadTypeImage from "../middlewares/verifyUploadTypeImage.middlewares";

const subTaskRoutes = express.Router();

subTaskRoutes.post("/list", verifyAccessToken, subTaskListController);
subTaskRoutes.post("/create", verifyAccessToken, verifyUploadTypeImage.single("file"), subTaskCreateController);
subTaskRoutes.post("/detail", verifyAccessToken, subTaskDetailController);
subTaskRoutes.post("/update", verifyAccessToken, verifyUploadTypeImage.single("file"), subTaskUpdateController);
subTaskRoutes.post("/delete", verifyAccessToken, subTaskDeleteController);

export default subTaskRoutes;
