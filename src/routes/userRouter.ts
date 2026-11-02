import { Router } from "express";
import { roleMiddleware } from "../modules/shared/infrastructure/middlewares/roleMiddleware";
import { index } from "../modules/user/infrastructure/controllers/userController";

const userRouter = Router()

userRouter.get('/v1/users/list', roleMiddleware('creator'), index)

export default userRouter