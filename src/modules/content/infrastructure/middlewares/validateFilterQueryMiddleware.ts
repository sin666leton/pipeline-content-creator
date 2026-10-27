import { NextFunction, Response, Request } from "express";
import { FilterContentSchema } from "../validations/content.validation";

const validateFilterQueryMiddleware = (req: Request<{}, {}, {}, {status?: string}>, res: Response, next: NextFunction) => {
    const status = req.query.status

    if (status) {
        const result = FilterContentSchema.safeParse(req.query)

        res.locals.filters = {
            status: result ? result.data?.status : undefined
        }
    }

    next()
}

export default validateFilterQueryMiddleware