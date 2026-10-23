import { paginateChannel } from "../../infrastructure/repositories/channelRepository"

const paginateChannelUsecase = async (currentPage: number, userId: number) => {
    const [data, meta] = await paginateChannel(currentPage, 10, userId)

    return {
        data: data.map(channels => {
            return {
                ...channels,
                id: Number(channels.id),
                userId: Number(channels.userId)
            }
        }),
        meta: meta
    }
}

export default paginateChannelUsecase