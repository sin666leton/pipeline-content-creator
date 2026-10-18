import ApplicationException from "./ApplicationException.ts";

class InvalidCredentialError extends ApplicationException {
    constructor() {
        super("Email atau password salah", 401)
    }
}

export default InvalidCredentialError