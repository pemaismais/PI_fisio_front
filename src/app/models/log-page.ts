import { LogEntry } from "./log-entry";

export interface LogPage {
    content: LogEntry[],
    totalElements: number,
    totalPages: number,
}
