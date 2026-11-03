import z from "zod";
import { CreateTaskSchema } from "../../infrastructure/validations/task.validation";

export type TCreateTaskCommand = z.infer<typeof CreateTaskSchema>
export type TToggleStatusTaskCommand = {
    id: number,
    userId: number
}