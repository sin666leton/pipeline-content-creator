import { Router } from "express";
import { registerSchema } from "../validations/registerSchema";
import { registerV1 } from "../controllers/v1/authController.v1";
import { validateRequest } from "../../../shared/infrastructure/middlewares/validateRequest";

const authRouter = Router()

// v1
authRouter.post("/v1/auth/register", validateRequest(registerSchema), registerV1)

export default authRouter