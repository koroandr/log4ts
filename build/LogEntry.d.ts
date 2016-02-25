import { LogLevel } from "./LogLevel";
export interface LogEntry {
    level: LogLevel;
    time: Date;
    message: string;
    tag: string;
}
