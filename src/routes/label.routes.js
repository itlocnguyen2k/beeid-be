import express from "express";
import { labelCheckExistController, labelCreateController, labelDeleteController, labelListController, labelUpdateController } from "../controllers/label.controllers";
import { verifyAccessToken } from "../middlewares/middlewares";
import verifyRequest from "../middlewares/verifyRequest.middlewares";
import { labelCreateSchema, labelExistSchema } from "../schema/setting/setting.schema";

const labelRoutes = express.Router();

labelRoutes.post("/label/list", verifyAccessToken, labelListController);
labelRoutes.post("/label/create", verifyAccessToken, verifyRequest(labelCreateSchema), labelCreateController);
labelRoutes.post("/label/check-exist", verifyAccessToken, verifyRequest(labelExistSchema), labelCheckExistController);
labelRoutes.post("/label/update", verifyAccessToken, labelUpdateController);
labelRoutes.post("/label/delete", verifyAccessToken, labelDeleteController);

export default labelRoutes;
