import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import InvalidCredentialError from "../../application/exceptions/InvalidCredentialError"
import findUserByEmailService from "./findUserByEmailService"
import { TLoginPayload } from "../../../auth/infrastructure/validations/loginSchema"

const loginService = async ({ email, password }: TLoginPayload) => {
    const user = await findUserByEmailService(email)

    if (!user) throw new InvalidCredentialError()

    const res = await bcrypt.compare(password, user.passwordHash)

    if (!res) throw new InvalidCredentialError()

    const token = jwt.sign({
        id: user.id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
    },
        process.env.JWT_SECRET || "secret",
        {
            expiresIn: (process.env.JWT_EXPIRES_IN as any) || "1d"
        })

    return {
        id: Number(user.id.toString()),
        email: user.email,
        name: user.name,
        role: user.role,
        token: token
    }
}

export default loginService