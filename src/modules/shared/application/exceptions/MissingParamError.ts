import ApplicationException from "./ApplicationException.ts";

class MissingParamError extends ApplicationException {
    constructor(params: string) {
        super(`Invalid parameter ${params}`, 400)
    }
}

export default MissingParamError