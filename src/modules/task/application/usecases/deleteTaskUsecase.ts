import { deleteTask } from "../../infrastructure/repositories/taskRepository"

const deleteTaskUsecase = async (id: number) => {
    await deleteTask(id)
}

export default deleteTaskUsecase