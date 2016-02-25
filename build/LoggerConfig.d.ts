import { IAppender } from "./IAppender";
import { LogLevel } from "./LogLevel";
export default class LoggerConfig {
    private level;
    constructor(appender?: IAppender, level?: LogLevel);
    addAppender(appender: IAppender): void;
    setLevel(level: LogLevel): void;
    getAppenders(): IAppender[];
    getLevel(): LogLevel;
    private appenders;
    static createFromJson(json: ConfigJson): LoggerConfig;
}
export interface ConfigJson {
    layouts: ConfigJsonLayout[];
    level: "ALL" | "TRACE" | "DEBUG" | "INFO" | "WARN" | "ERROR" | "FATAL" | "OFF";
}
export interface ConfigJsonLayout {
    type: "basic" | "html";
    appenders: ConfigJsonAppender[];
}
export interface ConfigJsonAppender {
    type: "console" | "dom";
    options?: ConfigJsonDomAppenderOptions;
}
export interface ConfigJsonDomAppenderOptions {
    container_id: string;
    escape_html?: boolean;
}
