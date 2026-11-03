import prisma from "../../../../core/databases/prisma"
import { TCreateMetricCommand } from "../../application/dtos/metric.command"

export const createMetric = async (command: TCreateMetricCommand & {contentId: number}) => {
    return await prisma.contentMetric.create({
        data: {
            recordedAt: command.recorded,
            commentsCount: command.comments,
            contentId: command.contentId,
            likesCount: command.likes,
            sharesCount: command.shares,
            viewsCount: command.views
        }
    })
}

export const deleteMetric = async (id: number) => {
    return await prisma.contentMetric.delete({
        where: {
            id: id
        }
    })
}