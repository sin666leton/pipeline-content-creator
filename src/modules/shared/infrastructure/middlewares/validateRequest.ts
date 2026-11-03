import type { Request, Response, NextFunction } from "express"
import { ZodError, type ZodSchema } from "zod"
import ValidationError, { TValidationErrorIssue } from "../../application/exceptions/ValidationError"

export const validateRequest = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = schema.parse(req.body)
            next()
        } catch (error) {
            if (error instanceof ZodError) {
                const err: TValidationErrorIssue[] = []

                error.issues.forEach(each => {
                    err.push({
                        field: each.path.toString(),
                        message: each.message
                    })
                });

                throw new ValidationError(err)
            }
            next(error)
        }
    }
}