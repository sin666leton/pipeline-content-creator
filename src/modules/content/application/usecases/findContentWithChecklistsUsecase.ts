import ItemNotFoundError from "../../../shared/application/exceptions/ItemNotFoundError";
import timestampFormatterService from "../../../shared/application/services/timestampFormatterService";
import { findContentWithChecklists } from "../../infrastructure/repositories/contentRepository";
import { TFindContentChecklistsQuery } from "../dtos/content.query";

const findContentWithChecklistsUsecase = async (query: TFindContentChecklistsQuery) => {
    const content = await findContentWithChecklists(query)

    if (!content) throw new ItemNotFoundError("Konten")

    return {
        channel: {
            id: Number(content.channelId),
            name: content.channel.handleName,
            platform: content.channel.platform
        },
        content: {
            id: Number(content.id),
            title: content.title,
            description: content.description,
            format: content.formatType,
            status: content.status,
            scriptDraft: content.scriptDraft,
            priority: content.priority,
            publishedDate: content.publishedDate,
            publishedUrl: content.publishedUrl,
            createdAt: timestampFormatterService(content.createdAt)
        },
        checklists: content.checklists.map(checklist => ({
            id: Number(checklist.id),
            isCompleted: checklist.isCompleted,
            name: checklist.taskName,
            user: {
                id: Number(checklist.userId),
                name: checklist.user.name
            }
        }))
    }
}

export default findContentWithChecklistsUsecase