import z from "zod";
import { RegisterSchema } from "../../infrastructure/validations/registerSchema";

export type TCreateUserCommand = z.infer<typeof RegisterSchema>