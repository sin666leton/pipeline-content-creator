import prisma from "../../../../core/databases/prisma"
import ConflictError from "../../application/exceptions/ConflictError"

const validateContentBeforePublishService = async (contentId: number, userId: number) => {
    const checklists = await prisma.contentChecklist.findFirst({
        select: {
            id: true,
            isCompleted: true,
            contentId: true,
            content: {
                select: {
                    userId: true
                }
            }
        },
        where: {
            isCompleted: false,
            contentId: contentId,
            content: {
                userId: userId
            }
        },
    })

    console.log(checklists)

    if (checklists) throw new ConflictError("Selesaikan Task terlebih dahulu")
}

export default validateContentBeforePublishService