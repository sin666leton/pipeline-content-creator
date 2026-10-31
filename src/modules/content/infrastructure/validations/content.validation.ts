import { ContentStatus } from "@prisma/client";
import z from "zod";

export const CreateContentSchema = z.object({
    channelId: z.number('Channel ID tidak valid')
        .min(1, 'Channel ID tidak valid'),

    title: z.string('Judul konten tidak boleh kosong')
        .max(255, 'Judul konten tidak lebih dari 255 karakter'),

    description: z.string('Deskripsi konten tidak valid'),

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

export const UpdateContentSchema = z.object({
    title: z.string('Judul konten tidak boleh kosong')
        .max(255, 'Judul konten tidak lebih dari 255 karakter')
        .optional(),

    description: z.string('Deskripsi konten tidak valid')
        .optional(),

    formatType: z.preprocess(
        (val) => (typeof val === "string" ? val.trim().toLowerCase() : val),
        z.enum(['short_video', 'long_video', 'carousel', 'single_post'], 'Format konten tidak valid, tersedia: short_video, long_video, carousel, single_post'),
    )
    .optional(),

    scriptDraft: z.string('Draft tidak valid')
        .optional(),

    priority: z.preprocess(
        (val) => (typeof val === "string" ? val.trim().toLowerCase() : val),
        z.enum(['low', 'medium', 'high'], 'Prioritas konten tidak valid, tersedia: low, medium, high'),
    )
    .optional(),

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
    )
    .optional(),
});

export const UpdateStatusContentSchema = z.object({
    status: z.preprocess(
        val => (typeof val === "string" ? val.trim().toLowerCase() : val),
        z.enum(
            ['idea', 'scripting', 'recording', 'editing', 'ready', 'published'],
            "Status tidak valid, tersedia: idea, scripting, recording, editing, ready, published"
        )
    ),
    
    publishedUrl: z.preprocess(
        val => (typeof val === "string" && val.trim() === "" ? undefined : val),
        z.string()
            .url("URL publikasi tidak valid")
            .optional()
    )
})
.superRefine((data, ctx) => {
    if (data.status === "published" && !data.publishedUrl) {
        ctx.addIssue({
            code: "custom",
            path: ["publishedUrl"],
            message: "Published URL wajib diisi ketika status published",
        });
    }
})

export const FilterContentSchema = z.object({
    status: z.preprocess(
        val => typeof val === "string" ? val.toLowerCase() : val,
        z.enum(ContentStatus)
            .optional()
    )
})