///<reference path="../../typings/jasmine/jasmine.d.ts" />
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
        })).toBe("2015-05-21 10:12:42 ERROR [tag] - test message");
    });
});
