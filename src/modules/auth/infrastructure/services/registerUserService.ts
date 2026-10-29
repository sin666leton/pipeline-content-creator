import prisma from "../../../../core/databases/prisma"
import { TCreateUserCommand } from "../../application/dtos/auth.command"
import EmailAlreadyRegisteredError from "../../application/errors/EmailAlreadyRegisteredError"
import bcrypt from "bcrypt"

const registerUserService = async (payload: TCreateUserCommand) => {
    const user = await prisma.user.findFirst({
        select: {
            email: true,
        },
        where: {
            email: payload.email
        }
    })

    if (user) throw new EmailAlreadyRegisteredError(payload.email)

    const hashPass = await bcrypt.hash(payload.password, 10)

    return await prisma.user.create({
        data: {
            email: payload.email,
            name: payload.name,
            passwordHash: hashPass,
            role: payload.role
        }
    })
}

export default registerUserService