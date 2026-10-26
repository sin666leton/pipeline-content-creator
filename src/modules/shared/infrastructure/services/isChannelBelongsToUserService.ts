import prisma from "../../../../core/databases/prisma"
import ItemNotFoundError from "../../application/exceptions/ItemNotFoundError"

type TIsChannelBelongsToUserParams = {
    channelId: number,
    userId: number
}

const isChannelBelongsToUserService = async (params: TIsChannelBelongsToUserParams): Promise<void> => {
    const res = await prisma.channel.findUnique({
        select: {
            id: true,
            userId: true
        },
        where: {
            id: params.channelId,
            userId: params.userId
        }
    })

    if (!res) throw new ItemNotFoundError('Channel')
}

export default isChannelBelongsToUserService