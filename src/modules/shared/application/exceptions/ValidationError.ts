import ApplicationException from "./ApplicationException";

export type TValidationErrorIssue = {
    field: string,
    message: string
}

export default class ValidationError extends ApplicationException {
    private issues: TValidationErrorIssue[] = []

    constructor(issues: TValidationErrorIssue[]) {
        super("Validation Error", 422)
        this.issues = issues
    }

    get getError() {
        return this.issues
    }
}