import { Request, Response } from "express"
import registerUsecase from "../../../application/usecases/registerUsecase"
import { TRegisterPayload } from "../../validations/registerSchema"

export const registerV1 = async (req: Request<{}, {}, TRegisterPayload>, res: Response) => {
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