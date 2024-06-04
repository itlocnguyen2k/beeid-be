import express from "express";
import verifyAccessToken from "../middlewares/verifyAccessToken.middlewares";
import verifyUploadTypeImage from "../middlewares/verifyUploadTypeImage.middlewares";
import {
  projectCreateController,
  projectDeleteController,
  projectDetailController,
  projectListController,
  projectUpdateController,
} from "../controllers/project.controllers";

const projectRoutes = express.Router();

projectRoutes.post("/list", verifyAccessToken, projectListController);
projectRoutes.post("/create", verifyAccessToken, verifyUploadTypeImage.single("file"), projectCreateController);
projectRoutes.post("/detail", verifyAccessToken, projectDetailController);
projectRoutes.post("/update", verifyAccessToken, verifyUploadTypeImage.single("file"), projectUpdateController);
projectRoutes.post("/delete", verifyAccessToken, projectDeleteController);

export default projectRoutes;
