import express from "express";
import { sendRequestAcceptFriendController, sendRequestFollowController, sendRequestUnFollowController, sendRequestUnFriendController } from "../controllers/follow.controllers";
import { verifyAccessToken } from "../middlewares/middlewares";
import verifyRequest from "../middlewares/verifyRequest.middlewares";
import { followingsSchema } from "../schema/account/follow.schema";

const followRoutes = express.Router();

followRoutes.post("/send-request-followings", verifyAccessToken, verifyRequest(followingsSchema), sendRequestFollowController);
followRoutes.post("/send-request-unfollowings", verifyAccessToken, verifyRequest(followingsSchema), sendRequestUnFollowController);
followRoutes.post("/send-request-unfriend", verifyAccessToken, verifyRequest(followingsSchema), sendRequestUnFriendController);
followRoutes.post("/send-request-accept-friend", verifyAccessToken, verifyRequest(followingsSchema), sendRequestAcceptFriendController);

export default followRoutes;
