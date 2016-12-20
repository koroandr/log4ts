import BasicLayout from "../../src/layouts/BasicLayout";
import {LogLevel} from "../../src/LogLevel";
describe('BasicLayout', ()=>{
    var layout;
    beforeEach(()=>{
        layout = new BasicLayout();
    });
    it('formats as intended', ()=>{
        expect(layout.format({
            message: 'test message',
            level: LogLevel.ERROR,
            tag: 'tag',
            time: new Date(Date.parse("21 May 2015 10:12:42"))
        }, false)).toBe("2015-05-21 10:12:42 ERROR [tag] - test message");
    });

    it('add data if required', ()=>{
        expect(layout.format({
            message: 'test message',
            level: LogLevel.ERROR,
            tag: 'tag',
            time: new Date(Date.parse("21 May 2015 10:12:42")),
            object: { foo: 1, bar: "asd" }
        }, true)).toBe('2015-05-21 10:12:42 ERROR [tag] - test message ' + JSON.stringify({ foo: 1, bar: "asd" }, null, 2));
    });
});
