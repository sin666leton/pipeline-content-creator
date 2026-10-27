import { Response, Request } from "express"

export const createTask = async (req: Request<{id: string}, {}>, res: Response) => {

    
    return res
        .status(201)
        .json({
            data: 
        })
}