import loginService from "../../../shared/infrastructure/services/loginService"
import { TLoginPayload } from "../../infrastructure/validations/loginSchema"

const loginUsecase = async (payload: TLoginPayload) => {
    const res = await loginService(payload)

    return res
}

export default loginUsecase