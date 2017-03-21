export as namespace log4ts;

export class Logger {
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
}

export class LoggerConfig {
    constructor(appender?: IAppender, level?: LogLevel, tags?: string[]);
    addAppender(appender: IAppender): void;
    setLevel(level: LogLevel): void;
    getAppenders(): IAppender[];
    getLevel(): LogLevel;
    hasTag(tag: string): boolean;
    static createFromJson(json: ConfigJson): LoggerConfig;
}

/*
    INTERFACES
 */

export interface IAppender {
    setLayout(layout: ILayout): void;
    setLayoutFunction(layout: ILayoutFunction): void;
    append(entry: LogEntry): void;
    clear(): void;
}

export interface ILayout {
    format(entry: LogEntry): string;
}

export interface ILayoutFunction {
    (entry: LogEntry): string;
}

export interface LogEntry {
    level: LogLevel;
    time: Date;
    message: string;
    tag: string;
}

export enum LogLevel {
    ALL = 0,
    TRACE = 1,
    DEBUG = 2,
    INFO = 3,
    WARN = 4,
    ERROR = 5,
    FATAL = 6,
    OFF = 7,
}

/*
    CONFIG JSON
 */

export interface ConfigJson {
    layouts: ConfigJsonLayout[];
    level: "ALL" | "TRACE" | "DEBUG" | "INFO" | "WARN" | "ERROR" | "FATAL" | "OFF";
    tags: string[];
}
export interface ConfigJsonLayout {
    type: "basic" | "html";
    appenders: ConfigJsonAppender[];
    options?: ConfigHtmlLayoutOptions;
}
export interface ConfigHtmlLayoutOptions {
    color_scheme?: "LIGHT" | "DARK" | "SOLARIZED" | HTMLLayoutColors;
}
export interface ConfigJsonAppender {
    type: "console" | "dom";
    options?: ConfigJsonDomAppenderOptions;
}
export interface ConfigJsonDomAppenderOptions {
    container_id: string;
    escape_html?: boolean;
    buffer_size?: number;
}

export interface HTMLLayoutColors {
    tag: string;
    message: string;
    time: string;
    level: string;
}