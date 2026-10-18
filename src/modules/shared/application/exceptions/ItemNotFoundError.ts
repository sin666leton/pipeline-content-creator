import ApplicationException from "./ApplicationException.ts";

class ItemNotFoundError extends ApplicationException {
    constructor(entity: string) {
        super(`${entity} not found`, 404)
    }
}

export default ItemNotFoundError