import type { NextFunction, Request, Response } from "express";
import UnauthorizedError from "../../application/exceptions/UnauthorizedError";
import ForbiddenError from "../../application/exceptions/ForbiddenError";

export type TRole = "admin" | "creator" | "editor" ;

export const roleMiddleware = (...allowedRoles: TRole[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) throw new UnauthorizedError();

        const userRole = req.user.role as TRole;
        
        if (!allowedRoles.includes(userRole)) throw new ForbiddenError("Role tidak sah")

        next();
    };
};