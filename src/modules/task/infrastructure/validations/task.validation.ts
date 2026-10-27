import z from "zod";

export const CreateTaskSchema = z.object({
    userId: z.number('ID User tidak valid'),
    
    taskName: z.string()
        .max(255, 'Nama tugas maksimal 255 karakter')
})