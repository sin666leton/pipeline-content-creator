import { deleteMetric } from "../../infrastructure/repositories/metricRepository"

const deleteMetricUsecase = async (id: number) => {
    const res = await deleteMetric(id)

    return {
        ...res,
        id: Number(res.id),
        contentId: Number(res.contentId)
    }
}

export default deleteMetricUsecase