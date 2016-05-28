import {IAppender} from "./IAppender";
import {LogLevel} from "./LogLevel";
import {ILayout} from "./ILayout";
import BasicLayout from "./layouts/BasicLayout";
import HTMLLayout from "./layouts/HTMLLayout";
import ConsoleAppender from "./appenders/ConsoleAppender";
import DOMAppender from "./appenders/DOMAppender";
import {HTMLLayoutColorTheme} from "./layouts/HTMLLayout";
import {HTMLLayoutColors} from "./layouts/HTMLLayout";

export default class LoggerConfig {
    constructor(appender?: IAppender, private level: LogLevel = LogLevel.INFO, private tags?: string[], private capture_stack?: boolean) {
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

    public captureStack():boolean {
        return this.capture_stack;
    }

    public hasTag(tag: string) {
        if (!this.tags || this.tags.length === 0) return true;

        for (let i in this.tags) {
            let t = this.tags[i];
            if (t === tag) {
                return true;
            }
        }

        return false;
    }

    private appenders: IAppender[] = [];

    public static createFromJson(json: ConfigJson): LoggerConfig {
        let config = new LoggerConfig(null, LogLevel[json.level], json.tags);
        for (let layout_json of json.layouts) {
            let layout: ILayout;

            switch (layout_json.type) {
                case "basic":
                    layout = new BasicLayout();
                    break;
                case "html":
                    let color_scheme = layout_json.options && layout_json.options.color_scheme;
                    let colors;
                    if (typeof color_scheme === "string") {
                        colors = HTMLLayoutColorTheme[color_scheme as string];
                    } else {
                        colors = color_scheme as HTMLLayoutColors;
                    }
                    layout = new HTMLLayout(colors);
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
                        appender = new DOMAppender(options.container_id, options.escape_html, options.buffer_size);
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
    capture_stack:boolean;
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
