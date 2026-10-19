import validateUserByIdService from "../../../shared/infrastructure/services/validateUserByIdService";
import { createChannel } from "../../infrastructure/repositories/channelRepository";
import { TCreateChannelPayload } from "../../infrastructure/validations/createChannelValidation";

const createChannelUsecase = async (payload: TCreateChannelPayload & {userId: number}) => {
    await validateUserByIdService(payload.userId)

    const channel = await createChannel(payload)

    return channel
}

export default createChannelUsecase