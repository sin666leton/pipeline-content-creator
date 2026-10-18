import type {Request, Response} from "express"
import { TCreateChannelPayload } from "../validations/createChannelValidation"
import createChannelUsecase from "../../application/usecases/createChannelUsecase"
import { createLog, deleteLog } from "../../../shared/infrastructure/services/loggerService"
import { deleteChannel } from "../repositories/channelRepository"

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
    
    const channel = await deleteChannel(Number(id))

    deleteLog(
        req.ip,
        'Channel',
        req.user?.id,
        channel
    )

    return res
        .status(204)
        .json()
}