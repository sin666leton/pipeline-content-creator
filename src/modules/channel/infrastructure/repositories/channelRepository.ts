import prisma from "../../../../core/databases/prisma"
import { TCreateChannelPayload } from "../validations/createChannelValidation"
import ItemNotFoundError from "../../../shared/application/exceptions/ItemNotFoundError"
import { Prisma } from "@prisma/client"

export const createChannel = async (payload: TCreateChannelPayload & {userId: number}) => {
    const res = await prisma.channel.create({
        data: {
            userId: payload.userId,
            handleName: payload.handleName,
            platform: payload.platform
        }
    })

    return res
}

export const deleteChannel = async (id: number) => {
    try {
        const res = await prisma.channel.delete({
            where: {
                id: id
            }
        })

        return res
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2025") throw new ItemNotFoundError("Channel")
        }

        throw error
    }
}