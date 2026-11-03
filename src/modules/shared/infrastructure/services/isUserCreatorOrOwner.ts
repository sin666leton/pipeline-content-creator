import prisma from "../../../../core/databases/prisma"
import ItemNotFoundError from "../../application/exceptions/ItemNotFoundError"

type TIsUserCreatorOrOwnerParams = {
    userId: number,
    contentId: number
}

const isUserCreatorOrOwner = async (params: TIsUserCreatorOrOwnerParams) => {
    const res = await prisma.content.findUnique({
        where: {
            id: params.contentId
        }
    })

    if (!res) throw new ItemNotFoundError("Konten")

    if (Number(res.userId) !== Number(params.userId)) {
        const editor = await prisma.user.findUnique({
            where: {
                id: params.userId,
                role: "editor"
            }
        })
    
        if (!editor) throw new ItemNotFoundError("Editor")
    }

}

export default isUserCreatorOrOwner