import { Router } from "express";
import { roleMiddleware } from "../modules/shared/infrastructure/middlewares/roleMiddleware";
import { create, destroy } from "../modules/metric/infrastructure/controllers/metricController";
import { validateRequest } from "../modules/shared/infrastructure/middlewares/validateRequest";
import { metricsSchema } from "../modules/metric/infrastructure/validations/metric.schema";

const metricRouter = Router()

metricRouter.post('/v1/contents/:id/metrics', validateRequest(metricsSchema), roleMiddleware('creator'), create)
metricRouter.delete('/v1/metrics/:id', roleMiddleware('creator', 'admin'), destroy)

export default metricRouter