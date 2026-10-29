import InvalidRoleError from "../../../shared/application/exceptions/InvalidRoleError"
import registerUserService from "../../infrastructure/services/registerUserService"
import { TCreateUserCommand } from "../dtos/auth.command"

const registerUsecase = async (payload: TCreateUserCommand) => {
    if (payload.role === null) payload.role = "creator"
    if (payload.role !== 'creator' && payload.role !== 'editor') throw new InvalidRoleError(payload.role)

    await registerUserService(payload)
}

export default registerUsecase