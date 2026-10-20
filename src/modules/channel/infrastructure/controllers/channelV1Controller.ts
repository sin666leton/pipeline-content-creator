import type {Request, Response} from "express"
import { TCreateChannelPayload } from "../validations/createChannelValidation"
import createChannelUsecase from "../../application/usecases/createChannelUsecase"
import { createLog, deleteLog } from "../../../shared/infrastructure/services/loggerService"
import deleteChannelUsecase from "../../application/usecases/deleteChannelUsecase"
import { TAuthUser } from "../../../shared/infrastructure/middlewares/authMiddleware"

export const store = async (req: Request<{}, {}, TCreateChannelPayload>, res: Response) => {
    const {handleName, platform} = req.body

    const result = await createChannelUsecase({
        handleName: handleName,
        platform: platform,
        userId: Number(req.user?.id)
    })

    createLog(
        req.ip,
        'Channel',
        req.user?.id,
        result
    )

    return res
        .status(201)
        .json()
}

export const destroy = async (req: Request, res: Response) => {
    const id = req.params.id
    
    const currentUser = req.user as TAuthUser

    const channel = await deleteChannelUsecase({
        channelId: Number(id),
        role: currentUser.role,
        userId: Number(currentUser.id)
    })

    deleteLog(
        req.ip,
        'Channel',
        currentUser.id,
        channel
    )

    return res
        .status(204)
        .json()
}