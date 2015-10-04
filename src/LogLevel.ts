export enum LogLevel {
    ALL = 0,
    TRACE = 1,
    DEBUG = 2,
    INFO = 3,
    WARN = 4,
    ERROR = 5,
    FATAL = 6,
    OFF = 7
}

export function logLevelToString(level: LogLevel): string {
    return LogLevel[level];
}
