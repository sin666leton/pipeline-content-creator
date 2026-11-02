import {Request, Response} from "express"
import getEditorAndCreatorUsecase from "../../application/usecases/getEditorAndCreatorUsecase"
import { TAuthUser } from "../../../shared/infrastructure/middlewares/authMiddleware"

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