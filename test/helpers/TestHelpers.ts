import {LogEntry} from "../../src/LogEntry";
import {LogLevel} from "../../src/LogLevel";
export function createLogEntry(message: string): LogEntry {
    return {
        time: new Date(),
        message: message,
        level: LogLevel.INFO,
        tag: 'tag',
        object: null,
        deep: 1,
        stack: {}
    }
}
