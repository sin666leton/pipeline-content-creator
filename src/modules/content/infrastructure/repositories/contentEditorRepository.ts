import prisma from "../../../../core/databases/prisma";
import { TGetContentQuery } from "../../application/dtos/content.query";

export const getContentWhereEditorBelongsTo = async (query: TGetContentQuery) => {
    const res = await prisma.contentChecklist.findMany({
        select: {
            id: true,
            userId: true,
            content: {
                select: {
                    id: true,
                    userId: true,
                    channelId: true,
                    title: true,
                    formatType: true,
                    status: true,
                    priority: true,
                    scheduledDate: true,
                
                    channel: {
                        select: {
                            id: true,
                            handleName: true,
                            platform: true
                        }
                    }
                }
            }
        },
        where: {
            userId: query.userId,
            ...(query.channelId && {
                channelId: query.channelId
            }),
            ...(query.status && {
                status: query.status
            }),
            ...(query.format && {
                status: query.format
            })
        },
        orderBy: {
            id: "desc"
        }
    })

    return res
}

type abc = {
    contentId: number,
    userId: number,
    value: string
}

export const findEditorContent = async (command: abc) => {
    const res = await prisma.content.findFirst({
        select: {
            id: true,
            status: true,
            checklists: {
                where: {
                    userId: command.userId,
                },
                select: {
                    id: true,
                    userId: true,
                },
                take: 1,
            },
        },
        where: {
            id: command.contentId,
            checklists: {
                some: {
                    userId: command.userId,
                },
            },
        },
    })

    return res
}