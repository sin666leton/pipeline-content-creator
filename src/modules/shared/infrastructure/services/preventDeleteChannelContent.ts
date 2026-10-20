import prisma from "../../../../core/databases/prisma"
import ForbiddenError from "../../application/exceptions/ForbiddenError"

const preventDeleteChannelContent = async (channelId: number) => {
    const res = await prisma.content.findFirst({
        select: {
            id: true,
            channelId: true
        },
        where: {
            channelId: channelId
        }
    })

    if (res) throw new ForbiddenError("Kamu tidak dapat menghapus channel yang memiliki konten") 
}

export default preventDeleteChannelContent