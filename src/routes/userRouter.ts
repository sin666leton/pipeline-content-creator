import { Router } from "express";
import { roleMiddleware } from "../modules/shared/infrastructure/middlewares/roleMiddleware";
import { destroy, index, paginate } from "../modules/user/infrastructure/controllers/userController";

const userRouter = Router()

userRouter.get('/v1/users', roleMiddleware('admin'), paginate)
userRouter.get('/v1/users/list', roleMiddleware('creator'), index)
userRouter.delete('/v1/users/:id', roleMiddleware('admin'), destroy)

export default userRouter