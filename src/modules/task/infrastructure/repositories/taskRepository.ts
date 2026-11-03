import { Prisma } from "@prisma/client";
import prisma from "../../../../core/databases/prisma";
import { TCreateTaskCommand, TToggleStatusTaskCommand } from "../../application/dtos/task.command";
import ItemNotFoundError from "../../../shared/application/exceptions/ItemNotFoundError";

export const findTaskById = async (id: number) => {
    const res = await prisma.contentChecklist.findUnique({
        select: {
            id: true,
            contentId: true,
            isCompleted: true,
            userId: true,
            content: {
                select: {
                    id: true,
                    userId: true,
                    status: true
                }
            }
        },
        where: {
            id: id,
        }
    })

    return res
}

export const createTask = async (command: TCreateTaskCommand & {contentId: number}) => {
    const res = await prisma.contentChecklist.create({
        data: {
            ...command,
            isCompleted: false
        }
    })

    return {
        id: Number(res.id),
        taskName: res.taskName,
        isCompleted: res.isCompleted
    }
}

export const toggleStatusTask = async (command: TToggleStatusTaskCommand & {currentStatus: boolean}) => {
    const res = await prisma.contentChecklist.update({
        data: {
            isCompleted: !command.currentStatus
        },
        where: {
            id: command.id
        }
    })

    return {
        ...res,
        id: Number(res.id),
        userId: Number(res.userId)
    }
}

export const deleteTask = async (id: number) => {
    try {
        const res = await prisma.contentChecklist.delete({
            where: {
                id: id
            }
        })

        return res
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2025") throw new ItemNotFoundError("Tugas")
        }

        throw error
    }
}