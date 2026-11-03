import ForbiddenError from "./ForbiddenError";

export default class RoleNotMatchingError extends ForbiddenError {
    constructor(role: string) {
        super(`${role} tidak berhak mengakses halaman ini`)
    }
}