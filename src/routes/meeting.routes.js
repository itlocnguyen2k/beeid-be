import express from "express";
import { meetingCreateController, meetingDeleteController, meetingListController } from "../controllers/meeting.controllers";
import verifyAccessToken from "../middlewares/verifyAccessToken.middlewares";

const meetingRoutes = express.Router();

meetingRoutes.post("/list", verifyAccessToken, meetingListController);
meetingRoutes.post("/create", verifyAccessToken, meetingCreateController);
meetingRoutes.post("/delete", verifyAccessToken, meetingDeleteController);

export default meetingRoutes;
