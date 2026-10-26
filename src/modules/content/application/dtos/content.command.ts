import z from "zod";
import { CreateUpdateContentSchema } from "../../infrastructure/validations/content.validation";

export type TCreateContentCommand = z.infer<typeof CreateUpdateContentSchema>
export type TUpdateContentCommand = z.infer<typeof CreateUpdateContentSchema>
export type TDeleteContentCommand = {
    id: number,
    userId: number
}