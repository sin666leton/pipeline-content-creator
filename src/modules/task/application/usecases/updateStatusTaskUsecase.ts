import ForbiddenError from "../../../shared/application/exceptions/ForbiddenError";
import ItemNotFoundError from "../../../shared/application/exceptions/ItemNotFoundError";
import { findTaskById, toggleStatusTask } from "../../infrastructure/repositories/taskRepository";
import { TToggleStatusTaskCommand } from "../dtos/task.command";

const updateStatusTaskUsecase = async (command: TToggleStatusTaskCommand) => {
    const task = await findTaskById(command.id)

    if (!task) throw new ItemNotFoundError("Tugas konten")
    if (command.userId !== Number(task.userId) && command.userId !== Number(task.content.userId)) throw new ForbiddenError("Kamu tidak berhak mengubah tugas ini")

    const res = await toggleStatusTask({
        ...command,
        currentStatus: task.isCompleted
    })

    return {
        id: Number(res.id),
        taskName: res.taskName,
        status: res.isCompleted
    }
}

export default updateStatusTaskUsecase