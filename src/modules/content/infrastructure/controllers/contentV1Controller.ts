import type {Request, Response} from "express"
import { TAuthUser } from "../../../shared/infrastructure/middlewares/authMiddleware"
import { TContentStatusType } from "../../application/dtos/content.data"
import createContentUsecase from "../../application/usecases/createContentUsecase"
import { TCreateContentCommand, TUpdateContentCommand, TUpdateStatusContentCommand } from "../../application/dtos/content.command"
import { createLog, deleteLog, updateLog } from "../../../shared/infrastructure/services/loggerService"
import updateContentUsecase from "../../application/usecases/updateContentUsecase"
import deleteContentUsecase from "../../application/usecases/deleteContentUsecase"
import updateStatusContentUsecase from "../../application/usecases/updateStatusContentUsecase"
import { ContentStatus } from "@prisma/client"
import getContentWithChannelUsecase from "../../application/usecases/getContentWithChannelUsecase"
import findContentWithChecklistsUsecase from "../../application/usecases/findContentWithChecklistsUsecase"
import paginateContentUsecase from "../../application/usecases/paginateContentUsecase"

export const paginate = async (
    req: Request<{}, {}, {}, {page?: string, platform?: string, format?: string, status?: string}>,
    res: Response<{}, {filters: {status: TContentStatusType|undefined, platform: string|undefined, format: string|undefined}}>
) => {
    const {page} = req.query
    const {status, platform, format} = res.locals.filters
    const user = req.user as TAuthUser

    const result = await paginateContentUsecase({
        page: page ? parseInt(page) : 1,
        userId: user.role === "admin" ? 0 : Number(user.id),
        platform: platform,
        format: format,
        status: status
    })
    
    return res
        .status(200)
        .json(result)
}

export const index = async (
    req: Request<{}, {}, {}, {format?: string, status?: string}>,
    res: Response<{}, {filters: {status: TContentStatusType|undefined, platform: string|undefined}}>
) => {
    const {format} = req.query
    const {status, platform} = res.locals.filters

    const result = await getContentWithChannelUsecase({
        status: status,
        userId: (req.user as TAuthUser).id,
        platform: platform,
        format: format,
    })
    
    return res
        .status(200)
        .json({
            data: result
        })
}

export const read = async (req: Request<{id: string}>, res: Response) => {
    const {id} = req.params
    const user = (req.user as TAuthUser)

    const content = await findContentWithChecklistsUsecase({
        contentId: parseInt(id),
        userId: user.role === "editor" ? 0 : Number(user.id)
    })

    return res
        .status(200)
        .json({
            data: content
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
        userId: currentUser.role === 'admin' ? 0 : Number(currentUser.id)
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