import { Request } from 'express';
import type { TUser } from '../modules/user/infrastructure/repositories/userRepository.ts';

declare global {
    namespace Express {
        interface Request {
            user?: TUser;
        }
    }
}