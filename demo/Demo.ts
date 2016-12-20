import Logger from "../src/Logger";
import LoggerConfig from "../src/LoggerConfig";
import {IAppender} from "../src/IAppender";
import ConsoleAppender from "../src/appenders/ConsoleAppender";
import {ILayout} from "../src/ILayout";
import BasicLayout from "../src/layouts/BasicLayout";
import DOMAppender from "../src/appenders/DOMAppender";
import {LogLevel} from '../src/LogLevel';
import {default as HTMLLayout, HTMLLayoutColorTheme} from "../src/layouts/HTMLLayout";

class Demo {

    run() {
        this.init();

        //Messages
        document.getElementById("trace").addEventListener("click", (e)=>{
            this.logger.trace("Trace message", e, 100);
        });
        document.getElementById("debug").addEventListener("click", (e)=>{
            this.logger.debug("Debug message", e, 100);
        });
        document.getElementById("info").addEventListener("click", (e)=>{
            this.logger.info("Info message", e, 100);
        });
        document.getElementById("warn").addEventListener("click", (e)=>{
            this.logger.warn("Warn message", e, 100);
        });
        document.getElementById("error").addEventListener("click", (e)=>{
            this.logger.error("Error message", e, 100);
        });
        document.getElementById("fatal").addEventListener("click", (e)=>{
            this.logger.fatal("Fatal message", e, 100);
        });

        //Level
        var level_checkers = document.getElementsByName("level");
        for (var i = 0; i < level_checkers.length; i++) {
            (()=>{
                var checker: HTMLInputElement = <HTMLInputElement>level_checkers.item(i);
                checker.addEventListener('click', ()=>{
                    this.config.setLevel(<LogLevel>+checker.value);
                });
            })();
        }

        //Layouts
        var layout_checkers = document.getElementsByName("layout");
        for (var i = 0; i < layout_checkers.length; i++) {
            (()=>{
                var checker: HTMLInputElement = <HTMLInputElement>layout_checkers.item(i);
                checker.addEventListener('click', ()=>{
                    this.setLayout(checker.value);
                });
            })();
        }

        //Appenders
        var appender_checkers = document.getElementsByName("appender");
        for (var i = 0; i < appender_checkers.length; i++) {
            (()=>{
                var checker: HTMLInputElement = <HTMLInputElement>appender_checkers.item(i);
                checker.addEventListener('click', ()=>{
                    this.setAppender(checker.value);
                });
            })();
        }
    }

    private setLayout(id) {
        switch (id) {
            case "basic":
                this.layout = new BasicLayout();
                break;
            case "html":
                this.layout = new HTMLLayout(HTMLLayoutColorTheme.SOLARIZED);
                break;
        }
        this.appender.setLayout(this.layout);
    }

    private setAppender(id) {
        switch (id) {
            case "console":
                this.appender = new ConsoleAppender();
                break;
            case "dom":
                this.appender = new DOMAppender('test');
                break;
        }
        this.appender.setLayout(this.layout);
        this.config = new LoggerConfig(this.appender, this.config.getLevel());
        Logger.setConfig(this.config);
    }

    private init() {
        this.layout = new BasicLayout();
        this.appender = new ConsoleAppender();
        this.appender.setLayout(this.layout);
        this.config = new LoggerConfig(this.appender);
        this.logger = new Logger();
        Logger.setConfig(this.config);
    }

    private logger: Logger;
    private appender: IAppender;
    private layout: ILayout;
    private config: LoggerConfig;
}

export = new Demo();
