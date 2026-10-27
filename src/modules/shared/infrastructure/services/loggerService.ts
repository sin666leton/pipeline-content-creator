import { activityLogger } from "../../../../core/logger/pino"
import { Request } from "express"

export const requestLog = (request: Request) => {
    activityLogger.info({
        request: request
    })
}

export const loginLog = (ip: string|undefined, email: string, status: boolean) => {
    activityLogger.info({
        action: "Login",
        ip: ip ?? "anonymous",
        details: {
            email: email,
            status: status
        }
    })
}

export const logoutLog = (ip: string|undefined, userId: number| undefined) => {
    activityLogger.info({
        action: "Logout",
        ip: ip ?? "anonymous",
        performedBy: userId
    })
}

export const createLog = (ip: string|undefined, entity: string, userId: number| undefined, details: Record<string, any>) => {
    activityLogger.info({
        action: "CREATE",
        ip: ip ?? "anonymous",
        entity: entity,
        performedBy: userId ?? "anonymous",
        details: details
    })
}

export const updateLog = (ip: string|undefined, entity: string, userId: number| undefined, details: Record<string, any>) => {
    activityLogger.info({
        action: "CREATE",
        ip: ip ?? "anonymous",
        entity: entity,
        performedBy: userId ?? "anonymous",
        details: details
    })
}

export const deleteLog = (ip: string|undefined, entity: string, userId: number| undefined, details: Record<string, any>) => {
    activityLogger.info({
        action: "DELETE",
        ip: ip ?? "anonymous",
        entity: entity,
        performedBy: userId ?? "anonymous",
        details: details
    })
}