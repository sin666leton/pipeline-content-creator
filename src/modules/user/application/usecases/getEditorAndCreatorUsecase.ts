import getEditorAndCreator from "../../infrastructure/repositories/UserRepository";
import { TGetEditorAndCreator } from "../dtos/user.query";

const getEditorAndCreatorUsecase = async (query: TGetEditorAndCreator) => {
    const res = await getEditorAndCreator(query)

    return res.map(user => ({
        ...user,
        id: Number(user.id),
    }))
}

export default getEditorAndCreatorUsecase