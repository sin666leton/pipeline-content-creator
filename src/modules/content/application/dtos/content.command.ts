import z from "zod";
import { CreateContentSchema, UpdateContentSchema, UpdateStatusContentSchema } from "../../infrastructure/validations/content.validation";

export type TUpdateStatusContentCommand = z.infer<typeof UpdateStatusContentSchema>
export type TCreateContentCommand = z.infer<typeof CreateContentSchema>
export type TUpdateContentCommand = z.infer<typeof UpdateContentSchema>
export type TDeleteContentCommand = {
    id: number,
    userId: number
}
