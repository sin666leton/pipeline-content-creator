import { TContentStatusType } from "./content.data";

export type TGetContentQuery = {
    userId: number,
    status?: TContentStatusType,
    channelId?: number,
    format?: string
}

export type TFindContentChecklistsQuery = {
    userId: number,
    contentId: number
}

export type TEditorUpdateContentCommand = {
    contentId: number,
    userId: number
}

export type TPaginateContentQuery = {
    page: number,
    userId: number,
    status?: string,
    channelId?: number,
    format?: string
}