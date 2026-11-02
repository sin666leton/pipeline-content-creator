import {Request, Response} from "express"
import getEditorAndCreatorUsecase from "../../application/usecases/getEditorAndCreatorUsecase"
import { TAuthUser } from "../../../shared/infrastructure/middlewares/authMiddleware"
import paginateUserUsecase from "../../application/usecases/paginateUserUsecase"
import deleteUserUsecase from "../../application/usecases/deleteUserUsecase"
import { deleteLog } from "../../../shared/infrastructure/services/loggerService"

export const paginate = async (req: Request, res: Response) => {
    const {page} = req.query
    const result = await paginateUserUsecase(Number(page ?? 1))
    
    return res
        .status(200)
        .json(result)
}

export const index = async (req: Request, res: Response) => {
    const users = await getEditorAndCreatorUsecase({
        creatorId: Number((req.user as TAuthUser).id)
    })

    return res
        .status(200)
        .json({
            data: users
        })
}

export const destroy = async (req: Request<{id: string}>, res: Response) => {
    const {id} = req.params

    const result = await deleteUserUsecase(parseInt(id))

    deleteLog(
        req.ip,
        'User',
        (req.user as TAuthUser).id,
        result
    )

    return res
        .status(204)
        .json()
}