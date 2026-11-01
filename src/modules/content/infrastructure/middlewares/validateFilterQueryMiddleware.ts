import { NextFunction, Response, Request } from "express";
import { FilterContentSchema } from "../validations/content.validation";

const validateFilterQueryMiddleware = (
    req: Request<{}, {}, {}, {status?: string, platform?: string, format?: string}>,
    res: Response,
    next: NextFunction
) => {
    const result = FilterContentSchema.safeParse(req.query)

    res.locals.filters = {
        status: result.success ? result.data.status : undefined,
        platform: result.success ? result.data.platform : undefined,
        format: result.success ? result.data.format : undefined
    }

    next()
}

export default validateFilterQueryMiddleware