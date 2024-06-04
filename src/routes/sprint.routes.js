import express from "express";
import {
  sprintCreateController,
  sprintDeleteController,
  sprintDetailController,
  sprintListController,
  sprintUpdateController,
} from "../controllers/sprint.controllers";
import verifyAccessToken from "../middlewares/verifyAccessToken.middlewares";
import verifyUploadTypeImage from "../middlewares/verifyUploadTypeImage.middlewares";

const sprintRoutes = express.Router();

sprintRoutes.post("/list", verifyAccessToken, sprintListController);
sprintRoutes.post("/create", verifyAccessToken, verifyUploadTypeImage.single("file"), sprintCreateController);
sprintRoutes.post("/detail", verifyAccessToken, sprintDetailController);
sprintRoutes.post("/update", verifyAccessToken, verifyUploadTypeImage.single("file"), sprintUpdateController);
sprintRoutes.post("/delete", verifyAccessToken, sprintDeleteController);

export default sprintRoutes;
