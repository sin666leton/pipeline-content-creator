import { Router } from "express";
import { validateRequest } from "../modules/shared/infrastructure/middlewares/validateRequest";
import { loginV1, registerV1 } from "../modules/auth/infrastructure/controllers/v1/authController.v1";
import { RegisterSchema } from "../modules/auth/infrastructure/validations/registerSchema";
import { LoginSchema } from "../modules/auth/infrastructure/validations/loginSchema";

const authRouter = Router()

// v1
authRouter.post("/v1/auth/register", validateRequest(RegisterSchema), registerV1)
authRouter.post("/v1/auth/login", validateRequest(LoginSchema), loginV1)

export default authRouter