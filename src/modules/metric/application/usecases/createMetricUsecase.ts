import { createMetric } from "../../infrastructure/repositories/metricRepository";
import { TCreateMetricCommand } from "../dtos/metric.command";

const createMetricUsecase = async (command: TCreateMetricCommand & {contentId: number}) => {
    const res = await createMetric(command)

    return {
        ...res,
        id: Number(res.id),
        contentId: Number(res.contentId)
    }
}

export default createMetricUsecase