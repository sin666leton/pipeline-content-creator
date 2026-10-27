import isChannelBelongsToUserService from "../../../shared/infrastructure/services/isChannelBelongsToUserService";
import { updateContent } from "../../infrastructure/repositories/contentRepository";
import { TUpdateContentCommand } from "../dtos/content.command";

const updateContentUsecase = async (command: TUpdateContentCommand & {userId: number, id: number}) => {
    await isChannelBelongsToUserService({
        channelId: command.channelId,
        userId: command.userId
    })

    const result = await updateContent(command)

    return {
        id: Number(result.id),
        channelId: Number(result.channelId),
        title: result.title,
        description: result.description,
        formatType: result.formatType,
        status: result.status,
        priority: result.priority,
        scheduledDate: result.scheduledDate
    }
}

export default updateContentUsecase