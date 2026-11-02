import { deleteUser } from "../../infrastructure/repositories/UserRepository"

const deleteUserUsecase = async (id: number) => {
    const res = await deleteUser(id)

    return {
        ...res,
        id: Number(res.id)
    }
}

export default deleteUserUsecase