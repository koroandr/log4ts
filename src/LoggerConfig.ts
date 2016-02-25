
import {IAppender} from "./IAppender";
import {LogLevel} from "./LogLevel";
import {ILayout} from "./ILayout";
import BasicLayout from "./layouts/BasicLayout";
import HTMLLayout from "./layouts/HTMLLayout";
import ConsoleAppender from "./appenders/ConsoleAppender";
import DOMAppender from "./appenders/DOMAppender";
export default class LoggerConfig {
    constructor(appender?: IAppender, private level: LogLevel = LogLevel.INFO) {
        if (appender) {
            this.addAppender(appender);
        }
    }
    public addAppender(appender: IAppender) {
        this.appenders.push(appender);
    }

    public setLevel(level: LogLevel) {
        this.level = level;
    }

    public getAppenders() {
        return this.appenders;
    }

    public getLevel() {
        return this.level;
    }

    private appenders: IAppender[] = [];

    public static createFromJson(json: ConfigJson): LoggerConfig {
        let config = new LoggerConfig(null, LogLevel[json.level]);
        for (let layout_json of json.layouts) {
            let layout: ILayout;

            switch (layout_json.type) {
                case "basic":
                    layout = new BasicLayout();
                    break;
                case "html":
                    layout = new HTMLLayout();
                    break;
            }

            for (let appender_json of layout_json.appenders) {
                let appender: IAppender;

                switch (appender_json.type) {
                    case "console":
                        appender = new ConsoleAppender();
                        break;
                    case "dom":
                        let options = appender_json.options as ConfigJsonDomAppenderOptions;
                        appender = new DOMAppender(options.container_id, options.escape_html);
                        break;

                }

                appender.setLayout(layout);

                config.addAppender(appender);
            }
        }

        return config;
    }
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
    escape_html?: boolean
}
