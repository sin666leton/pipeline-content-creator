import { Prisma } from "@prisma/client"
import prisma from "../../../../core/databases/prisma"
import { TGetEditorAndCreator } from "../../application/dtos/user.query"
import ItemNotFoundError from "../../../shared/application/exceptions/ItemNotFoundError"

export const paginateUser = async (page: number) => {
    return prisma.user.paginate({
        select: {
            id: true,
            name: true,
            role: true
        },
        where: {
            role: {
                not: "admin"
            }
        }
    })
    .withPages({
        limit: 10,
        includePageCount: true,
        page: page
    })
}

const getEditorAndCreator = async (query: TGetEditorAndCreator) => {
    return await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            role: true,
        },
        where: {
            OR: [
                {
                    id: query.creatorId,
                },
                {
                    role: "editor",
                },
            ],
        },
        orderBy: {
            role: "asc"
        }
    })
}

export const deleteUser = async (id: number) => {
    try {
        const res = await prisma.user.delete({
            where: {
                id: id,
                AND: [
                {
                    role: {
                        not: "admin"
                    }
                }
            ]
            }
        })

        return res
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2025") throw new ItemNotFoundError("Pengguna")
        }

        throw error
    }
}

export default getEditorAndCreator