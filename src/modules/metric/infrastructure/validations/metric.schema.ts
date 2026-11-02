import z from "zod";

export const metricsSchema = z.object({
    recorded: z.coerce.date(),
    comments: z.number().int().nonnegative(),
    likes: z.number().int().nonnegative(),
    shares: z.number().int().nonnegative(),
    views: z.number().int().nonnegative(),
});