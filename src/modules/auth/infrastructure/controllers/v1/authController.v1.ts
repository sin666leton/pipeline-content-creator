import { Request, Response } from "express"
import registerUsecase from "../../../application/usecases/registerUsecase"
import { TLoginPayload } from "../../validations/loginSchema"
import loginUsecase from "../../../application/usecases/loginUsecase"
import { TCreateUserCommand } from "../../../application/dtos/auth.command"

export const registerV1 = async (req: Request<{}, {}, TCreateUserCommand>, res: Response) => {
    const {email, name, password, role} = req.body
    
    await registerUsecase({
        email: email,
        name: name,
        password: password,
        role: role
    })

    return res
        .status(201)
        .json({})
}

export const loginV1 = async (req: Request<{}, {}, TLoginPayload>, res: Response) => {
    const {email, password} = req.body

    const result = await loginUsecase({email: email, password: password})

    return res
        .status(200)
        .json({
            data: {
                user: {
                    id: result.id,
                    name: result.name,
                    role: result.role
                },
                token: result.token
            }
        })
}