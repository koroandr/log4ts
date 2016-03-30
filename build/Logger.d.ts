import LoggerConfig from "./LoggerConfig";
export default class Logger {
    private tag;
    constructor(tag?: string);
    log(message: string, object?: any, deep?: number): void;
    info(message: string, object?: any, deep?: number): void;
    fatal(message: string, object?: any, deep?: number): void;
    error(message: string, object?: any, deep?: number): void;
    debug(message: string, object?: any, deep?: number): void;
    warn(message: string, object?: any, deep?: number): void;
    trace(message: string, object?: any, deep?: number): void;
    static setConfig(config: LoggerConfig): void;
    static getLogger(tag?: string): any;
    private static loggers;
    private doLog(level, message, object?, deep?);
    private static config;
}
