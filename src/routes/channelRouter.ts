import { Router } from "express";
import { destroy, store } from "../modules/channel/infrastructure/controllers/channelV1Controller";
import { validateRequest } from "../modules/shared/infrastructure/middlewares/validateRequest";
import { CreateChannelSchema } from "../modules/channel/infrastructure/validations/createChannelValidation";
import { roleMiddleware } from "../modules/shared/infrastructure/middlewares/roleMiddleware";

// v1
const v1ChannelRouter = Router()

v1ChannelRouter.post('/v1/channels', roleMiddleware('creator') ,validateRequest(CreateChannelSchema), store)
v1ChannelRouter.delete('/v1/channels/:id', roleMiddleware('creator', 'admin'), destroy)

export {
    v1ChannelRouter
}