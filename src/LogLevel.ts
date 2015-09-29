export enum LogLevel {
    ALL,
    TRACE,
    DEBUG,
    INFO,
    WARN,
    ERROR,
    FATAL,
    OFF
}

export function logLevelToString(level: LogLevel): string {
    return LogLevel[level];
}
