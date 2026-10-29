import ConflictError from "../../../shared/application/exceptions/ConflictError";
import ForbiddenError from "../../../shared/application/exceptions/ForbiddenError";
import ItemNotFoundError from "../../../shared/application/exceptions/ItemNotFoundError";
import { findContentById, updateContent } from "../../infrastructure/repositories/contentRepository";
import { TUpdateContentCommand } from "../dtos/content.command";

const updateContentUsecase = async (command: TUpdateContentCommand & {userId: number, id: number}) => {
    const content = await findContentById(Number(command.id))
    
    if (!content) throw new ItemNotFoundError("Konten")
    if (Number(content.userId) !== command.userId) throw new ForbiddenError("Kamu tidak berhak memperbarui konten ini")

    if (command.scriptDraft && content.status !== "scripting") throw new ConflictError("Draft hanya boleh ditambahkan ketika progress konten sudah mencapai scripting")

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