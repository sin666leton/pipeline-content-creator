import type {Request, Response} from "express"
import paginateContentWithChannelUsecase from "../../application/usecases/paginateContentWithChannelUsecase"
import { TAuthUser } from "../../../shared/infrastructure/middlewares/authMiddleware"
import { TContentStatusType } from "../../application/dtos/content.data"
import createContentUsecase from "../../application/usecases/createContentUsecase"
import { TCreateContentCommand, TUpdateContentCommand, TUpdateStatusContentCommand } from "../../application/dtos/content.command"
import { createLog, deleteLog, updateLog } from "../../../shared/infrastructure/services/loggerService"
import updateContentUsecase from "../../application/usecases/updateContentUsecase"
import deleteContentUsecase from "../../application/usecases/deleteContentUsecase"
import updateStatusContentUsecase from "../../application/usecases/updateStatusContentUsecase"
import { ContentStatus } from "@prisma/client"

export const index = async (req: Request<{}, {}, {}, {status?: TContentStatusType, channel_id?: string, page?: string}>, res: Response<{}, {filters: {status: TContentStatusType|undefined}}>) => {
    const {channel_id, page} = req.query

    const result = await paginateContentWithChannelUsecase({
        currentPage: page ? Number(page) : 1,
        perPage: 10,
        status: res.locals.filters ? res.locals.filters.status : undefined,
        userId: (req.user as TAuthUser).id,
        channelId: Number(channel_id)
    })
    
    return res
        .status(200)
        .json({
            data: result
        })
}

export const store = async (req: Request<{}, {}, TCreateContentCommand>, res: Response) => {
    const {channelId, description, formatType, priority, scheduledDate, title} = req.body
    
    const result = await createContentUsecase({
        userId: Number((req.user as TAuthUser).id),
        channelId: channelId,
        description: description,
        formatType: formatType,
        priority: priority,
        scheduledDate: scheduledDate,
        title: title
    })

    createLog(
        req.ip,
        'Content',
        req.user?.id,
        result
    )
    
    return res
        .status(201)
        .json({
            data: result
        })
}

export const update = async (req: Request<{id: string}, {}, TUpdateContentCommand>, res: Response) => {
    const {id} = req.params
    const {description, formatType, priority, scheduledDate, title, scriptDraft} = req.body
    
    const result = await updateContentUsecase({
        id: parseInt(id),
        userId: Number((req.user as TAuthUser).id),
        description: description,
        formatType: formatType,
        priority: priority,
        scheduledDate: scheduledDate,
        title: title,
        scriptDraft: scriptDraft
    })

    updateLog(
        req.ip,
        'Content',
        req.user?.id,
        result
    )
    
    return res
        .status(200)
        .json({
            data: result
        })
}

export const updateStatus = async (req: Request<{id: string}, {}, TUpdateStatusContentCommand>, res: Response) => {
    const {status, publishedUrl} = req.body    
    const currentUser = (req.user as TAuthUser)

    const content = await updateStatusContentUsecase({
        contentId: parseInt(req.params.id),
        status: status.toLowerCase() as ContentStatus,
        userId: Number(currentUser.id),
        publishedUrl: publishedUrl
    })

    updateLog(
        req.ip,
        'Status Content',
        currentUser.id,
        content
    )

    return res
        .status(200)
        .json({
            data: content
        })
}

export const destroy = async (req: Request<{id: string}>, res: Response) => {
    const {id} = req.params
    const currentUser = req.user as TAuthUser
    const result = await deleteContentUsecase({
        id: Number(id),
        userId: Number(currentUser.id)
    })

    deleteLog(
        req.ip,
        'Content',
        currentUser.id,
        result
    )
    
    return res
        .status(204)
        .json()
}