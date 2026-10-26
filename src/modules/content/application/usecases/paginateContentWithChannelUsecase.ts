import { TGetContentQuery } from "../dtos/content.query"
import { paginateContent } from "../../infrastructure/repositories/contentRepository"

const paginateContentWithChannelUsecase = async (query: TGetContentQuery) => {
    const [contents] = await paginateContent(query)

    return contents.map(content => ({
        id: Number(content.id),
        channelId: Number(content.channelId),
        channelName: content.channel.handleName,
        channelPlatform: content.channel.platform,
        title: content.title,
        formatType: content.formatType,
        status: content.status,
        priority: content.priority,
        scheduledDate: content.scheduledDate,
    }))
}

export default paginateContentWithChannelUsecase