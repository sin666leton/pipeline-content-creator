import { paginateUser } from "../../infrastructure/repositories/UserRepository"

const paginateUserUsecase = async (page: number) => {
    const [data, meta] = await paginateUser(page)

    return {
        data: data.map(user => ({
            ...user,
            id: Number(user.id)
        })),
        metadata: {
            ...meta,
            pages: Array.from({ length: meta.pageCount }, (_, i) => i + 1)
        }
    }
}

export default paginateUserUsecase