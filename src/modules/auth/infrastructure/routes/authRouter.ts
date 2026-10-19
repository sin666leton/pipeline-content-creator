import { Router } from "express";
import { registerSchema } from "../validations/registerSchema";
import { loginV1, registerV1 } from "../controllers/v1/authController.v1";
import { validateRequest } from "../../../shared/infrastructure/middlewares/validateRequest";
import { LoginSchema } from "../validations/loginSchema";

const authRouter = Router()

// v1
authRouter.post("/v1/auth/register", validateRequest(registerSchema), registerV1)
authRouter.post("/v1/auth/login", validateRequest(LoginSchema), loginV1)

export default authRouter