import ConflictError from "../../../shared/application/exceptions/ConflictError";

export default class EmailAlreadyRegisteredError extends ConflictError {
    constructor(email: string) {
        super(`Email ${email} sudah terdaftar`)
    }
}