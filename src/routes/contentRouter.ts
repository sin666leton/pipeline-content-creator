import { Router } from "express";
import { roleMiddleware } from "../modules/shared/infrastructure/middlewares/roleMiddleware";
import { destroy, index, store, update } from "../modules/content/infrastructure/controllers/contentV1Controller";
import { validateRequest } from "../modules/shared/infrastructure/middlewares/validateRequest";
import { CreateUpdateContentSchema } from "../modules/content/infrastructure/validations/content.validation";
import validateFilterQueryMiddleware from "../modules/content/infrastructure/middlewares/validateFilterQueryMiddleware";

const contentRouter = Router()

contentRouter.get('/v1/contents', validateFilterQueryMiddleware, roleMiddleware('creator'), index)
contentRouter.post('/v1/contents', roleMiddleware('creator'), validateRequest(CreateUpdateContentSchema), store)
contentRouter.put('/v1/contents/:id', roleMiddleware('creator'), validateRequest(CreateUpdateContentSchema), update)
contentRouter.delete('/v1/contents/:id', roleMiddleware('creator'), destroy)

export default contentRouter