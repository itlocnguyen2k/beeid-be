import express from "express";
import { priorityCheckExistController, priorityCreateController, priorityDeleteController, priorityListController, priorityUpdateController } from "../controllers/priority.controllers";
import { verifyAccessToken } from "../middlewares/middlewares";
import verifyRequest from "../middlewares/verifyRequest.middlewares";
import { priorityCreateSchema, priorityExistSchema } from "../schema/setting/setting.schema";

const priorityRoutes = express.Router();

priorityRoutes.post("/priority/list", verifyAccessToken, priorityListController);
priorityRoutes.post("/priority/create", verifyAccessToken, verifyRequest(priorityCreateSchema), priorityCreateController);
priorityRoutes.post("/priority/check-exist", verifyAccessToken, verifyRequest(priorityExistSchema), priorityCheckExistController);
priorityRoutes.post("/priority/update", verifyAccessToken, priorityUpdateController);
priorityRoutes.post("/priority/delete", verifyAccessToken, priorityDeleteController);

export default priorityRoutes;
