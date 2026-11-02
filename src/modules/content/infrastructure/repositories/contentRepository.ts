import { FormatType, Prisma } from "@prisma/client"
import prisma from "../../../../core/databases/prisma"
import { TCreateContentCommand, TDeleteContentCommand, TUpdateContentCommand, TUpdateStatusContentCommand } from "../../application/dtos/content.command"
import { TFindContentChecklistsQuery, TGetContentQuery, TPaginateContentQuery } from "../../application/dtos/content.query"
import ItemNotFoundError from "../../../shared/application/exceptions/ItemNotFoundError"
import { TContentStatusType } from "../../application/dtos/content.data"

export const getContent = async (query: TGetContentQuery) => {
    query.status === "published" ? query.status = undefined : query.status = query.status

    const res = await prisma.content.findMany({
        select: {
            id: true,
            userId: true,
            channelId: true,
            title: true,
            formatType: true,
            status: true,
            priority: true,
            scriptDraft: true,
            scheduledDate: true,
            channel: {
                select: {
                    id: true,
                    handleName: true,
                    platform: true
                }
            }
        },
        where: {
            userId: query.userId,
            ...(query.platform && {
                channel: {
                    platform: query.platform
                }
            }),
            ...(query.format && {
                formatType: query.format as FormatType
            }),
            status: query.status ? {
                equals: query.status as TContentStatusType,
                not: "published"
            }
            : {
                not: "published"
            }
        },
        orderBy: {
            id: "desc"
        }
    });

    return res
}

export const paginateContent = async (query: TPaginateContentQuery & {take: number}) => {
    const res = await prisma.content.paginate({
        select: {
            id: true,
            userId: true,
            channelId: true,
            title: true,
            formatType: true,
            status: true,
            priority: true,
            scheduledDate: true,
            description: true,
            channel: {
                select: {
                    id: true,
                    handleName: true,
                    platform: true
                }
            }
        },
        where: {
            ...(query.userId && {
                userId: query.userId
            }),
            ...(query.platform && {
                channel: {
                    platform: query.platform
                }
            }),
            ...(query.format && {
                formatType: query.format as FormatType
            }),
            ...(query.status && {
                status: query.status as TContentStatusType
            }),
        },
        orderBy: {
            id: "desc"
        }
    })
    .withPages({
        page: query.page,
        limit: query.take,
        includePageCount: true
    })

    return res
}

export const findContentWithChecklists = async (query: TFindContentChecklistsQuery) => {
    const res = await prisma.content.findFirst({
        select: {
            id: true,
            userId: true,
            channelId: true,
            description: true,
            title: true,
            formatType: true,
            status: true,
            priority: true,
            scheduledDate: true,
            publishedDate: true,
            publishedUrl: true,
            createdAt: true,
            updatedAt: true,
            scriptDraft: true,
            channel: {
                select: {
                    id: true,
                    handleName: true,
                    platform: true
                }
            },
            checklists: {
                select: {
                    id: true,
                    contentId: true,
                    taskName: true,
                    userId: true,
                    isCompleted: true,
                    user: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                }
            },
            metrics: {
                select: {
                    id: true,
                    contentId: true,
                    commentsCount: true,
                    recordedAt: true,
                    likesCount: true,
                    viewsCount: true,
                    sharesCount: true
                }
            }
        },
        where: {
            id: query.contentId,
            userId: query.userId
        },
    })

    return res
}

export const findContentById = async (contentId: number) => {
    const res = await prisma.content.findFirst({
        select: {
            id: true,
            userId: true,
            status: true,
            scheduledDate: true
        },
        where: {
            id: contentId
        }
    })

    return res
}

export const createContent = async (command: TCreateContentCommand & {userId: number}) => {
    const res = await prisma.content.create({
        data: {
            ...command,
            status: 'idea',
            scheduledDate: command.scheduledDate ? new Date(command.scheduledDate) : null
        }
    })

    return res
}

export const updateContent = async (command: TUpdateContentCommand & {id: number, userId: number}) => {
    try {
        const res = await prisma.content.update({
            data: {
                ...command,
                
                scheduledDate: command.scheduledDate ? new Date(command.scheduledDate) : null
            },
            where: {
                id: command.id,
                userId: command.userId
            }
        })
    
        return res
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2025") throw new ItemNotFoundError("Content")
        }

        throw error
    }
}

export const updateStatusContent = async (command: TUpdateStatusContentCommand & {contentId: number, userId: number}) => {
    const res = await prisma.content.update({
        data: {
            status: command.status,
            publishedUrl: (command.status === "published" ? command.publishedUrl : null),
            publishedDate: (command.status === "published" ? new Date() : null)
        },
        where: {
            id: command.contentId,
            userId: command.userId
        }
    })

    return res
}

export const deleteContent = async (command: TDeleteContentCommand) => {
    try {
        const res = await prisma.content.delete({
            where: {
                id: command.id,
                ...(command.userId && {
                    userId: command.userId
                }),
            }
        })

        return res
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2025") throw new ItemNotFoundError("Content")
        }

        throw error
    }
}