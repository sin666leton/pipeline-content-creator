import prisma from "../../../../core/databases/prisma"
import ItemNotFoundError from "../../application/exceptions/ItemNotFoundError"

const validateUserByIdService = async (id: number): Promise<void> => {
    const user = await prisma.user.findUnique({
        where: {
            id: BigInt(id)
        }
    })

    if (!user) throw new ItemNotFoundError('Pengguna')
}

export default validateUserByIdService
