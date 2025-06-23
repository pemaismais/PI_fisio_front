export interface LogEntry {
    revisionId: number,
    revisionTimestamp: string,
    username: string,
    revisionType: string
    entityName: string,
    entity: object,
}