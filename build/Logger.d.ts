import LoggerConfig from "./LoggerConfig";
export default class Logger {
    private tag;
    constructor(tag?: string);
    log(message: string): void;
    info(message: string): void;
    fatal(message: string): void;
    error(message: string): void;
    debug(message: string): void;
    warn(message: string): void;
    trace(message: string): void;
    static setConfig(config: LoggerConfig): void;
    static getLogger(tag?: string): any;
    private static loggers;
    private doLog(level, message);
    private static config;
}
