import { Response, Request } from "express"
import createTaskUsecase from "../../application/usecases/createTaskUsecase"
import { TCreateTaskCommand } from "../../application/dtos/task.command"
import updateStatusTaskUsecase from "../../application/usecases/updateStatusTaskUsecase"
import { TAuthUser } from "../../../shared/infrastructure/middlewares/authMiddleware"
import { createLog, updateLog } from "../../../shared/infrastructure/services/loggerService"

export const store = async (req: Request<{id: string}, {}, TCreateTaskCommand>, res: Response) => {
    const {taskName, userId} = req.body
    
    const result = await createTaskUsecase({
        contentId: parseInt(req.params.id),
        taskName: taskName,
        userId: Number(userId)
    })

    createLog(
        req.ip,
        'ContentChecklists',
        Number((req.user as TAuthUser).id),
        result
    )
    
    return res
        .status(201)
        .json({
            data: result
        })
}

export const update = async (req: Request<{id: string}>, res: Response) => {
    const result = await updateStatusTaskUsecase({
        id: parseInt(req.params.id),
        userId: Number((req.user as TAuthUser).id)
    })

    updateLog(
        req.ip,
        'ContentChecklists',
        Number((req.user as TAuthUser).id),
        result
    )

    return res
        .status(200)
        .json({
            data: result
        })
}