import { Router } from "express";
import { roleMiddleware } from "../modules/shared/infrastructure/middlewares/roleMiddleware";
import { destroy, index, read, store, update, updateStatus } from "../modules/content/infrastructure/controllers/contentV1Controller";
import { validateRequest } from "../modules/shared/infrastructure/middlewares/validateRequest";
import validateFilterQueryMiddleware from "../modules/content/infrastructure/middlewares/validateFilterQueryMiddleware";
import { CreateContentSchema, UpdateContentSchema, UpdateStatusContentSchema } from "../modules/content/infrastructure/validations/content.validation";

const contentRouter = Router()

contentRouter.get('/v1/contents', validateFilterQueryMiddleware, roleMiddleware('creator', 'editor'), index)
contentRouter.post('/v1/contents', roleMiddleware('creator'), validateRequest(CreateContentSchema), store)
contentRouter.get('/v1/contents/:id', roleMiddleware('creator'), read)
contentRouter.put('/v1/contents/:id', roleMiddleware('creator'), validateRequest(UpdateContentSchema), update)
contentRouter.put('/v1/contents/:id/status', roleMiddleware('creator'), validateRequest(UpdateStatusContentSchema), updateStatus)
contentRouter.delete('/v1/contents/:id', roleMiddleware('creator'), destroy)

export default contentRouter