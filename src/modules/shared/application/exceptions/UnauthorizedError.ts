import ApplicationException from "./ApplicationException.ts";

class UnauthorizedError extends ApplicationException {
    constructor() {
        super('Unauthorized', 401)
    }
}

export default UnauthorizedError