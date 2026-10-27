import isChannelValid from "../../../shared/infrastructure/services/isChannelValidService";
import { createContent } from "../../infrastructure/repositories/contentRepository";
import { TCreateContentCommand } from "../dtos/content.command";

const createContentUsecase = async (command: TCreateContentCommand & {userId: number}) => {
    await isChannelValid(command.channelId)
    
    const result = await createContent(command)

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

export default createContentUsecase