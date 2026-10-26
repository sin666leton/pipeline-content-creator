export type TContentStatusType = "idea" | "scripting" | "recording" | "editing" | "ready" | "published"

export type TContentData = {
    channelId: number,
    userId: number,
    title: string,
    description: string,
    scriptDraft: string,
    formatType: string,
    status: string,
    priority: string,
    scheduledDate: string,
    createdAt: string,
    updatedAt: string,
    publishedDate?: string,
    publishedUrl?: string,
}