import express from "express";
import {
  accountCreateController,
  accountDeleteController,
  accountDetailController,
  accountListController,
  accountUpdateController,
  accountUpdatePermissionController,
} from "../controllers/account.controllers";
import verifyAccessToken from "../middlewares/verifyAccessToken.middlewares";
import verifyRequest from "../middlewares/verifyRequest.middlewares";
import verifyUploadTypeImage from "../middlewares/verifyUploadTypeImage.middlewares";
import { accountIdSchema } from "../schema/account/account.schema";

const accountRoutes = express.Router();

accountRoutes.post("/list", verifyAccessToken, accountListController);
accountRoutes.post("/create", verifyAccessToken, verifyUploadTypeImage.single("file"), accountCreateController);
accountRoutes.post("/detail", verifyAccessToken, verifyRequest(accountIdSchema), accountDetailController);
accountRoutes.post("/update", verifyAccessToken, verifyUploadTypeImage.single("file"), accountUpdateController);
accountRoutes.post("/update-permission", verifyAccessToken, accountUpdatePermissionController);
accountRoutes.post("/delete", verifyAccessToken, accountDeleteController);

export default accountRoutes;
