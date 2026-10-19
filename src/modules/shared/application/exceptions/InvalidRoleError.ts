import InternalServerError from "./InternalServerError";

export default class InvalidRoleError extends InternalServerError {
    constructor(role: string) {
        super(role)
    }
}