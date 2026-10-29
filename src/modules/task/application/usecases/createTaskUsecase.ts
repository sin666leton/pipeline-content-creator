import isUserCreatorOrOwner from "../../../shared/infrastructure/services/isUserCreatorOrOwner";
import { createTask } from "../../infrastructure/repositories/taskRepository";
import { TCreateTaskCommand } from "../dtos/task.command";

const createTaskUsecase = async (command: TCreateTaskCommand & {contentId: number}) => {
    await isUserCreatorOrOwner({
        contentId: command.contentId,
        userId: command.userId
    })

    const res = await createTask(command)

    return res
}

export default createTaskUsecase