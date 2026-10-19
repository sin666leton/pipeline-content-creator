import prisma from "../../../../core/databases/prisma"

const findUserByEmailService = async (email: string) => {
    const res = await prisma.user.findFirst({
        where: {
            email: email
        }
    })

    return res
}

export default findUserByEmailService