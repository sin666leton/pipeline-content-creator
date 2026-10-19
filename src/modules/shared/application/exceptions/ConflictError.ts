import ApplicationException from "./ApplicationException";

export default class ConflictError extends ApplicationException {
    constructor(message: string) {
        super(message, 309)
    }
}