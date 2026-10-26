import { ContentStatus } from "@prisma/client";
import z from "zod";

export const CreateUpdateContentSchema = z.object({
    channelId: z.number('Channel ID tidak valid')
        .min(1, 'Channel ID tidak valid'),

    title: z.string('Judul konten tidak boleh kosong')
        .max(255, 'Judul konten tidak lebih dari 255 karakter'),

    description: z.string('Deskripsi konten tidak valid'),

    scriptDraft: z.string('Draf teks tidak boleh kosong'),

    formatType: z.preprocess(
        (val) => (typeof val === "string" ? val.trim().toLowerCase() : val),
        z.enum(['short_video', 'long_video', 'carousel', 'single_post'], 'Format konten tidak valid, tersedia: short_video, long_video, carousel, single_post'),
    ),

    priority: z.preprocess(
        (val) => (typeof val === "string" ? val.trim().toLowerCase() : val),
        z.enum(['low', 'medium', 'high'], 'Prioritas konten tidak valid, tersedia: low, medium, high'),
    ),

    scheduledDate: z.string()
        .refine((date) => {
            const today = new Date();
            const todayString = [
                today.getFullYear(),
                String(today.getMonth() + 1).padStart(2, "0"),
                String(today.getDate()).padStart(2, "0"),
            ].join("-");

            return date >= todayString;
        },
        {
            message: "Jadwal tayang seharusnya lebih dari waktu saat ini",
        }
    ),
});

export const FilterContentSchema = z.object({
    status: z.preprocess(
        val => typeof val === "string" ? val.toLowerCase() : val,
        z.enum(ContentStatus)
            .optional()
    )
})