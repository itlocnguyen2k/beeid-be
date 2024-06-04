import express from "express";
import { loginController } from "../controllers/auth.controllers";
import { tryVerifyLoginCodeController, verifyLoginCodeController } from "../controllers/code.controllers";
import {
  changePasswordController,
  changePasswordFirstTimeController,
  resetPasswordController,
  tryVerifyPasswordCodeController,
  verifyResetPasswordCodeController,
} from "../controllers/password.controllers";
import { verifyAccessToken } from "../middlewares/middlewares";
import verifyRequest from "../middlewares/verifyRequest.middlewares";
import { loginCodeSchema, loginSchema } from "../schema/auth.schema";
import { changePasswordSchema, emailSchema, passwordCodeSchema } from "../schema/password.schema";

const authRoutes = express.Router();

authRoutes.post("/login", verifyRequest(loginSchema), loginController);
authRoutes.post("/verify-login-code", verifyAccessToken, verifyRequest(loginCodeSchema), verifyLoginCodeController);
authRoutes.post("/try-verify-login-code", verifyAccessToken, tryVerifyLoginCodeController);
authRoutes.post("/change-password-first-time", verifyAccessToken, verifyRequest(changePasswordSchema), changePasswordFirstTimeController);
authRoutes.post("/reset-password", verifyRequest(emailSchema), resetPasswordController);
authRoutes.post("/verify-password-code", verifyRequest(passwordCodeSchema), verifyResetPasswordCodeController);
authRoutes.post("/try-verify-password-code", verifyRequest(emailSchema), tryVerifyPasswordCodeController);
authRoutes.post("/change-password", verifyAccessToken, verifyRequest(changePasswordSchema), changePasswordController);

export default authRoutes;
