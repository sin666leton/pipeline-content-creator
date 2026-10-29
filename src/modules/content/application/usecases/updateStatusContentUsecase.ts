import ConflictError from "../../../shared/application/exceptions/ConflictError";
import ForbiddenError from "../../../shared/application/exceptions/ForbiddenError";
import ItemNotFoundError from "../../../shared/application/exceptions/ItemNotFoundError";
import validateContentBeforePublishService from "../../../shared/infrastructure/services/validateContentBeforePublishService";
import { findContentById, updateStatusContent } from "../../infrastructure/repositories/contentRepository";
import { TUpdateStatusContentCommand } from "../dtos/content.command";

const updateStatusContentUsecase = async (command: TUpdateStatusContentCommand & {contentId: number, userId: number}) => {
    const content = await findContentById(Number(command.contentId))

    if (!content) throw new ItemNotFoundError("Konten")
    if (Number(content.userId) !== command.userId) throw new ForbiddenError("Kamu tidak berhak memperbarui konten ini")

    if (command.status === "published" && !command.publishedUrl) {
        throw new ConflictError("Wajib menyertakan link content")

    } else if (command.status === "ready") {
        await validateContentBeforePublishService(command.contentId, command.userId)
    }

    const res = await updateStatusContent(command)

    return {
        id: Number(res.id),
        title: res.title,
        status: res.status,
        publishedUrl: res.publishedUrl,
        publishedDate: res.publishedDate
    }

}

export default updateStatusContentUsecase