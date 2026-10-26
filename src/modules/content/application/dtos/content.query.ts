import { TContentStatusType } from "./content.data";

export type TGetContentQuery = {
    userId: number,
    perPage: number,
    currentPage: number,
    status?: TContentStatusType,
    channelId?: number,
}