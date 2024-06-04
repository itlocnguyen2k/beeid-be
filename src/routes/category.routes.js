import express from "express";
import {
  categoryCheckExistController,
  categoryCreateController,
  categoryDeleteController,
  categoryListController,
  categoryUpdateController,
} from "../controllers/category.controllers";
import { verifyAccessToken } from "../middlewares/middlewares";
import verifyRequest from "../middlewares/verifyRequest.middlewares";
import { categoryCreateSchema, categoryExistSchema } from "../schema/setting/setting.schema";

const categoryRoutes = express.Router();

categoryRoutes.post("/category/list", verifyAccessToken, categoryListController);
categoryRoutes.post("/category/create", verifyAccessToken, verifyRequest(categoryCreateSchema), categoryCreateController);
categoryRoutes.post("/category/check-exist", verifyAccessToken, verifyRequest(categoryExistSchema), categoryCheckExistController);
categoryRoutes.post("/category/update", verifyAccessToken, categoryUpdateController);
categoryRoutes.post("/category/delete", verifyAccessToken, categoryDeleteController);

export default categoryRoutes;
