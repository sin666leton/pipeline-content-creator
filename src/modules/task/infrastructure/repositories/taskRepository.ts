import prisma from "../../../../core/databases/prisma";
import { TCreateTaskCommand } from "../../application/dtos/task.command";

export const createTask = async (command: TCreateTaskCommand & {contentId: number}) => {
    const res = await prisma.contentChecklist.create({
        data: {
            ...command,
            isCompleted: false
        }
    })

    return res
}