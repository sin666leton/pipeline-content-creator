import {Request, Response} from "express"
import { TCreateMetricCommand } from "../../application/dtos/metric.command"
import createMetricUsecase from "../../application/usecases/createMetricUsecase"
import deleteMetricUsecase from "../../application/usecases/deleteMetricUsecase"
import { createLog, deleteLog } from "../../../shared/infrastructure/services/loggerService"
import { TAuthUser } from "../../../shared/infrastructure/middlewares/authMiddleware"

export const create = async (req: Request<{id: string}, {}, TCreateMetricCommand>, res: Response) => {
    const {
        comments,
        likes,
        recorded,
        shares,
        views
    } = req.body
    
    const result = await createMetricUsecase({
        comments: comments,
        contentId: Number(parseInt(req.params.id)),
        likes: likes,
        recorded: recorded,
        shares: shares,
        views: views
    })

    createLog(
        req.ip,
        'Content Metrics',
        Number((req.user as TAuthUser).id),
        result
    )

    return res
        .status(201)
        .json({
            data: result
        })
}

export const destroy = async (req: Request<{id: string}>, res: Response) => {
    const result = await deleteMetricUsecase(Number(parseInt(req.params.id)))

    deleteLog(
        req.ip,
        'Content Metrics',
        Number((req.user as TAuthUser).id),
        result
    )

    return res
        .status(200)
        .json({
            data: result
        })
}