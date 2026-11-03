import { Request } from 'express';
import { TAuthUser } from '../modules/shared/infrastructure/middlewares/authMiddleware';

declare global {
    namespace Express {
        interface Request {
            user?: TAuthUser
        }
    }
}