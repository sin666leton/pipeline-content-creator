import ApplicationException from "./ApplicationException";

export default class ForbiddenError extends ApplicationException {
    constructor(message: string) {
        super(message, 403)
    }
}