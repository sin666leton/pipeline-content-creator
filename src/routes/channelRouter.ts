import { Router } from "express";
import { destroy, store } from "../modules/channel/infrastructure/controllers/channelV1Controller";
import { validateRequest } from "../modules/shared/infrastructure/middlewares/validateRequest";
import { CreateChannelSchema } from "../modules/channel/infrastructure/validations/createChannelValidation";

// v1
const v1ChannelRouter = Router()

v1ChannelRouter.post('/v1/channels', validateRequest(CreateChannelSchema), store)
v1ChannelRouter.delete('/v1/channels/:id', destroy)

export {
    v1ChannelRouter
}