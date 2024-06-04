import express from "express";
import { boardChangeController, boardCreateController, boardUpdateController } from "../controllers/board.controllers";
import verifyAccessToken from "../middlewares/verifyAccessToken.middlewares";

const boardRoutes = express.Router();

boardRoutes.post("/create", verifyAccessToken, boardCreateController);
boardRoutes.post("/update", verifyAccessToken, boardUpdateController);
boardRoutes.post("/change", verifyAccessToken, boardChangeController);

export default boardRoutes;
