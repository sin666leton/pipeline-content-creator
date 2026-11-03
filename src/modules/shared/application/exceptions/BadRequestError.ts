import ApplicationException from "./ApplicationException.ts";

class BadRequestError extends ApplicationException {
    constructor(message: string) {
        super(message, 400)
    }
}

export default BadRequestError