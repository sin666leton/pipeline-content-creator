import { TGetContentQuery } from "../dtos/content.query"
import { getContent } from "../../infrastructure/repositories/contentRepository"
import getUserRoleService from "../../../shared/infrastructure/services/getUserRoleService"
import { getContentWhereEditorBelongsTo } from "../../infrastructure/repositories/contentEditorRepository"
import RoleNotMatchingError from "../../../shared/application/exceptions/RoleNotMatchingError"

const getContentWithChannelUsecase = async (query: TGetContentQuery) => {
    const userRole = await getUserRoleService(query.userId)

    switch (userRole) {
        case "creator":
            const contents = await getContent(query)

            return contents.map(content => ({
                content: {
                    id: Number(content.id),
                    title: content.title,
                    formatType: content.formatType,
                    status: content.status,
                    priority: content.priority,
                    scheduledDate: content.scheduledDate,
                },
                channel: {
                    id: Number(content.channelId),
                    name: content.channel.handleName,
                    platform: content.channel.platform,
                }
            }))            

        case "editor":
            const checklists = await getContentWhereEditorBelongsTo(query)

            return checklists.map(checklist => ({
                content: {
                    id: Number(checklist.content.id),
                    creatorId: Number(checklist.content.userId),
                    title: checklist.content.title,
                    formatType: checklist.content.formatType,
                    status: checklist.content.status,
                    priority: checklist.content.priority,
                    scheduledDate: checklist.content.scheduledDate
                },
                channel: {
                    id: Number(checklist.content.channel.id),
                    name: checklist.content.channel.handleName,
                    platform: checklist.content.channel.platform,
                }
            }))
    
        default:
            throw new RoleNotMatchingError(userRole)
    }


}

export default getContentWithChannelUsecase