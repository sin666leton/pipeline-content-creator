import { TContentStatusType } from "./content.data";

export type TPaginateContentQuery = {
    page: number,
    userId: number,
    status?: string,
    platform?: string,
    format?: string
}

export type TGetContentQuery = {
    userId: number,
    status?: TContentStatusType,
    platform?: string,
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
