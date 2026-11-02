import z from "zod";
import { metricsSchema } from "../../infrastructure/validations/metric.schema";

export type TCreateMetricCommand = z.infer<typeof metricsSchema>