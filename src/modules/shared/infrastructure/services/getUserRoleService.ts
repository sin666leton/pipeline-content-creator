import prisma from "../../../../core/databases/prisma"
import ItemNotFoundError from "../../application/exceptions/ItemNotFoundError"

const getUserRoleService = async (userId: number) => {
    const res = await prisma.user.findUnique({
        select: {
            id: true,
            role: true
        },
        where: {
            id: userId
        }
    })

    if (!res) throw new ItemNotFoundError("Pengguna")

    return res.role
}

export default getUserRoleService