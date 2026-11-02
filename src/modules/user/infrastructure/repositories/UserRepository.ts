import prisma from "../../../../core/databases/prisma"
import { TGetEditorAndCreator } from "../../application/dtos/user.query"

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
    })
}

export default getEditorAndCreator