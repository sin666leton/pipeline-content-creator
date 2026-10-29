import { Router } from "express";
import { validateRequest } from "../modules/shared/infrastructure/middlewares/validateRequest";
import { CreateTaskSchema } from "../modules/task/infrastructure/validations/task.validation";
import { store, update } from "../modules/task/infrastructure/controllers/taskV1Controller";
import { roleMiddleware } from "../modules/shared/infrastructure/middlewares/roleMiddleware";

const taskRouter = Router()

taskRouter.post('/v1/contents/:id/checklists', roleMiddleware('creator'),validateRequest(CreateTaskSchema), store)
taskRouter.patch('/v1/checklists/:id/toggle', roleMiddleware('creator', 'editor'), update)

export default taskRouter