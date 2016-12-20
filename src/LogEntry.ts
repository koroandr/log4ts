import {LogLevel} from "./LogLevel";

export interface LogEntry {
    level: LogLevel;
    object: any;
    deep: number;
    time: Date;
    message: string;
    tag: string;
    stack: any;
}
