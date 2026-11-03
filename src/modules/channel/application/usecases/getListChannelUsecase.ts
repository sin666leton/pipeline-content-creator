import { getSimpleChannel } from "../../infrastructure/repositories/channelRepository"

const getListChannelUsecase = async (id: number) => {
    const res = await getSimpleChannel(id)

    return res.map(channel => {
        return {
            ...channel,
            id: Number(channel.id)
        }
    })
}

export default getListChannelUsecase