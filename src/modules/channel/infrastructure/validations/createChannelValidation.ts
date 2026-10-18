import { z } from "zod";

export const CreateChannelSchema = z.object({
  handleName: z.string().min(1, "Handle name tidak boleh kosong").max(100, "Handle name maksimal 100 karakter"),
  platform: z.preprocess(
    (val) => (typeof val === "string" ? val.trim().toLowerCase() : val),
    z.enum(["youtube", "tiktok", "instagram", "linkedin"])
  )
});

export type TCreateChannelPayload = z.infer<typeof CreateChannelSchema>;