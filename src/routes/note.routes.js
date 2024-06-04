import express from "express";
import { noteCreateController, noteUpdateController } from "../controllers/note.controllers";
import verifyAccessToken from "../middlewares/verifyAccessToken.middlewares";
import verifyUploadFile from "../middlewares/verifyUploadFile.middlewares";

const noteRoutes = express.Router();

noteRoutes.post("/create", verifyAccessToken, verifyUploadFile.array("files", 10), noteCreateController);
noteRoutes.post("/update", verifyAccessToken, verifyUploadFile.array("files", 10), noteUpdateController);

export default noteRoutes;
