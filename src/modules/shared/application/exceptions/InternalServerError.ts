import ApplicationException from "./ApplicationException";

export default class InternalServerError extends ApplicationException {
    constructor(message: string) {
        super(message, 500)
    }
}