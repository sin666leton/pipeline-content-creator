import prisma from "../../../../core/databases/prisma"
import ItemNotFoundError from "../../application/exceptions/ItemNotFoundError"

const isChannelValid = async (channelId: number): Promise<void> => {
    const res = await prisma.channel.findUnique({
        select: {
            id: true
        },
        where: {
            id: channelId
        }
    })

    if (!res) throw new ItemNotFoundError('Channel')
}

export default isChannelValid