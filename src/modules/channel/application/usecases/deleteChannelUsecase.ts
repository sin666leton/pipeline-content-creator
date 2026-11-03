import ForbiddenError from "../../../shared/application/exceptions/ForbiddenError"
import ItemNotFoundError from "../../../shared/application/exceptions/ItemNotFoundError"
import preventDeleteChannelContent from "../../../shared/infrastructure/services/preventDeleteChannelContent"
import { deleteChannel, findChannelById } from "../../infrastructure/repositories/channelRepository"

type TDeleteChannelUsecasePayload = {
    userId: number,
    role: string,
    channelId: number
}

const deleteChannelUsecase = async (p: TDeleteChannelUsecasePayload) => {
    if (p.role !== "admin") {
        const channel = await findChannelById(p.channelId)

        if (!channel) throw new ItemNotFoundError("Channel")
        if (Number(channel.userId) !== Number(p.userId)) throw new ForbiddenError("Channel ini bukan milikmu")
    
        await preventDeleteChannelContent(p.channelId)
    }

    const result = await deleteChannel(p.channelId)

    return result
}

export default deleteChannelUsecase