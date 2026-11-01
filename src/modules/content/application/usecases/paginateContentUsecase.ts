import { paginateContent } from "../../infrastructure/repositories/contentRepository";
import { TPaginateContentQuery } from "../dtos/content.query";

const paginateContentUsecase = async (query: TPaginateContentQuery) => {
    const [contents, metadata] = await paginateContent({
        ...query,
        take: 10
    })

    return {
        data: contents.map(content => ({
            channel: {
                id: Number(content.channelId),
                name: content.channel.handleName,
                platform: content.channel.platform
            },
            content: {
                id: Number(content.id),
                title: content.title,
                priority: content.priority,
                format: content.formatType,
                status: content.status,
                scheduledDate: content.scheduledDate,
            }
        })),
        metadata: {
            ...metadata,
            pages: Array.from({ length: metadata.pageCount }, (_, i) => i + 1)
        }
    }
}

export default paginateContentUsecase