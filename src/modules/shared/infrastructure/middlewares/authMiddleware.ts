import type { NextFunction, Request, Response } from "express";
import UnauthorizedError from "../../application/exceptions/UnauthorizedError";
import jwt from "jsonwebtoken";
import BadRequestError from "../../application/exceptions/BadRequestError";
// import type { TUser } from "../../modules/user/infrastructure/repositories/userRepository.ts";

export type TAuthUser = {
    id: number,
    name: string,
    email: string,
    role: string
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) throw new BadRequestError("Missing Authorization: Bearer <token>")

    const token = authHeader.split(" ")[1]

    if (!token) throw new UnauthorizedError()

    try {
        const decode = jwt.verify(token, (process.env.JWT_SECRET || "secret"))
        req.user = (decode as unknown) as TAuthUser
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) throw new UnauthorizedError()
            
        throw error
    }

    next()
}

export default authMiddleware