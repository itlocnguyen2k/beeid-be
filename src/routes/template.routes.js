import express from "express";
import { verifyAccessToken } from "../middlewares/middlewares";
import { templateCheckExistController, templateCreateController, templateDeleteController, templateListController, templateUpdateController } from "../controllers/template.controllers";

const templateRoutes = express.Router();

templateRoutes.post("/template/list", verifyAccessToken, templateListController);
templateRoutes.post("/template/create", verifyAccessToken, templateCreateController);
templateRoutes.post("/template/check-exist", verifyAccessToken, templateCheckExistController);
templateRoutes.post("/template/update", verifyAccessToken, templateUpdateController);
templateRoutes.post("/template/delete", verifyAccessToken, templateDeleteController);

export default templateRoutes;
