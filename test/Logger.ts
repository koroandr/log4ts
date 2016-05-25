///<reference path="../typings/globals/jasmine/index.d.ts" />

import Logger from "../src/Logger";
import {IAppender} from "../src/IAppender";
import {ILayout} from "../src/ILayout";
import {ILayoutFunction} from "../src/ILayout";
import {LogEntry} from "../src/LogEntry";
import LoggerConfig from "../src/LoggerConfig";
import {LogLevel} from "../src/LogLevel";

describe("Logger", ()=>{
    var config: LoggerConfig,
        logger: Logger,
        appender: MockAppender;

    beforeEach(()=>{
        appender = new MockAppender();
        config = new LoggerConfig();
        logger = new Logger('tag');

        config.addAppender(appender);
        Logger.setConfig(config);
    });
    describe('log entry', ()=>{
        var entry: LogEntry;
        var current_time;
        beforeEach(()=>{
            current_time = new Date(2013, 9, 23);
            jasmine.clock().mockDate(current_time);
            logger.info('Test');
            entry = appender.logs[0];
        });

        it('contains correct message', ()=>{
            expect(entry.message).toBe('Test');
        });
        it('contains correct time', ()=>{
            expect(entry.time.getTime()).toBe(current_time.getTime());
        });
        it('contains correct level', ()=>{
            expect(entry.level).toBe(LogLevel.INFO);
        });
        it('contains correct tag', ()=>{
            expect(entry.tag).toBe('tag');
        });
    });
    describe('log level cumulativeness', ()=>{
        function logAllLevels() {
            logger.fatal('fatal');
            logger.error('error');
            logger.warn('warn');
            logger.info('info');
            logger.debug('debug');
            logger.trace('trace');
        }

        function getLogMessages(): string[] {
            return appender.logs.map((log: LogEntry)=>log.message);
        }

        it('works for OFF', ()=>{
            Logger.setConfig(new LoggerConfig(appender, LogLevel.OFF));
            logAllLevels();
            expect(getLogMessages()).toEqual([]);
        });
        it('works for FATAL', ()=>{
            Logger.setConfig(new LoggerConfig(appender, LogLevel.FATAL));
            logAllLevels();
            expect(getLogMessages()).toEqual(['fatal']);
        });
        it('works for ERROR', ()=>{
            Logger.setConfig(new LoggerConfig(appender, LogLevel.ERROR));
            logAllLevels();
            expect(getLogMessages()).toEqual(['fatal', 'error']);
        });
        it('works for WARN', ()=>{
            Logger.setConfig(new LoggerConfig(appender, LogLevel.WARN));
            logAllLevels();
            expect(getLogMessages()).toEqual(['fatal', 'error', 'warn']);
        });
        it('works for INFO', ()=>{
            Logger.setConfig(new LoggerConfig(appender, LogLevel.INFO));
            logAllLevels();
            expect(getLogMessages()).toEqual(['fatal', 'error', 'warn', 'info']);
        });
        it('works for DEBUG', ()=>{
            Logger.setConfig(new LoggerConfig(appender, LogLevel.DEBUG));
            logAllLevels();
            expect(getLogMessages()).toEqual(['fatal', 'error', 'warn', 'info', 'debug']);
        });
        it('works for TRACE', ()=>{
            Logger.setConfig(new LoggerConfig(appender, LogLevel.TRACE));
            logAllLevels();
            expect(getLogMessages()).toEqual(['fatal', 'error', 'warn', 'info', 'debug', 'trace']);
        });
        it('works for ALL', ()=>{
            Logger.setConfig(new LoggerConfig(appender, LogLevel.ALL));
            logAllLevels();
            expect(getLogMessages()).toEqual(['fatal', 'error', 'warn', 'info', 'debug', 'trace']);
        });
    });
});

class MockAppender implements IAppender {
    setLayout(layout:ILayout) {
    }

    setLayoutFunction(layout:ILayoutFunction) {
    }

    append(entry:LogEntry) {
        this.logs.push(entry);
    }

    clear() {
    }

    public logs: LogEntry[] = [];
}
