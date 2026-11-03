import { deleteContent } from "../../infrastructure/repositories/contentRepository";
import { TDeleteContentCommand } from "../dtos/content.command";

const deleteContentUsecase = async (command: TDeleteContentCommand) => {
    const res = await deleteContent(command)

    return res
}

export default deleteContentUsecase