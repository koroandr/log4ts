import ConsoleAppender from "../../src/appenders/ConsoleAppender";
import * as helpers from "../helpers/TestHelpers";
describe('ConsoleAppender', ()=>{
    var console_mock: MockConsole,
        appender: ConsoleAppender;
    beforeEach(()=>{
        console_mock = new MockConsole();
        appender = new ConsoleAppender(console_mock);
    });

    describe('layout', ()=>{
        it('can be passed as an object', ()=>{
            var data;
            var log = helpers.createLogEntry('test');

            appender.setLayout({
                format: (d)=>(data=d, '')
            });

            appender.append(log);

            expect(data).toBe(log);
        });
        it('can be passed as a function', ()=>{
            var data;
            var log = helpers.createLogEntry('test');

            appender.setLayoutFunction((d)=>(data=d, ''));

            appender.append(log);

            expect(data).toBe(log);
        });
    });

    it('logs using window.console', ()=>{
        appender.setLayoutFunction((d)=>d.message);

        appender.append(helpers.createLogEntry("1"));
        appender.append(helpers.createLogEntry("2"));
        appender.append(helpers.createLogEntry("3"));

        expect(console_mock.getLogs()).toEqual(["1", "2", "3"]);
    });

    it('can clear console', ()=>{
        console_mock.log('111');
        console_mock.log('222');
        console_mock.log('333');
        appender.clear();
        expect(console_mock.getLogs().length).toBe(0);
    });

});

class MockConsole implements Console {
    private logs: string[] = [];
    public log(message: string) {
        this.logs.push(message);
    }
    public clear() {
        this.logs = [];
    }
    getLogs() {
        return this.logs;
    }
    assert(test:boolean, message:string, optionalParams:any):void {
    }

    count(countTitle:string):void {
    }

    debug(message:string, optionalParams:any):void {
    }

    dir(value:any, optionalParams:any):void {
    }

    dirxml(value:any):void {
    }

    error(message:any, optionalParams:any):void {
    }

    group(groupTitle:string):void {
    }

    groupCollapsed(groupTitle:string):void {
    }

    groupEnd():void {
    }

    info(message:any, optionalParams:any):void {
    }

    msIsIndependentlyComposed(element:Element):boolean {
        return undefined;
    }

    profile(reportName:string):void {
    }

    profileEnd():void {
    }

    select(element:Element):void {
    }

    time(timerName:string):void {
    }

    timeEnd(timerName:string):void {
    }

    trace():void {
    }

    warn(message:any, optionalParams:any):void {
    }
    exception(message?: string, optionalParams?: any): void {
    }

    table(data: any): void {
    }
}
