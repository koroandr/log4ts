///<reference path="../../typings/jasmine/jasmine.d.ts" />

import DOMAppender from "../../src/appenders/DOMAppender";
import * as helpers from '../helpers/TestHelpers';

describe('DOMAppender', ()=>{
    var appender: DOMAppender,
        element: HTMLElement;

    beforeEach(()=>{
        element = document.createElement("div");
        element.id = "test";

        document.body.appendChild(element);

        appender = new DOMAppender("test");
    });
    afterEach(()=>{
        document.body.removeChild(element);
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

    it('appends to dom', ()=>{
        appender.setLayoutFunction(d=>d.message);
        appender.append(helpers.createLogEntry("test1"));
        appender.append(helpers.createLogEntry("test2"));
        appender.append(helpers.createLogEntry("test3"));

        expect(element.innerHTML).toBe('test1<br>test2<br>test3');
    });
    it('clears the dom', ()=>{
        element.innerHTML = 'abc<strong>test</strong>';

        appender.clear();

        expect(element.innerHTML).toBe('');
    });
    it('can limit number of entries in DOM', ()=>{
        appender = new DOMAppender('test', true, 3);
        appender.setLayoutFunction(d=>d.message);
        appender.append(helpers.createLogEntry("test1"));
        appender.append(helpers.createLogEntry("test2"));
        appender.append(helpers.createLogEntry("test3"));
        appender.append(helpers.createLogEntry("test4"));
        expect(element.innerHTML).toBe('test2<br>test3<br>test4');
    });
    it('works without container', ()=>{
        expect(()=>{
            appender = new DOMAppender('no_such_id');
            appender.setLayoutFunction(d=>d.message);
            appender.append(helpers.createLogEntry("test1"));
            appender.append(helpers.createLogEntry("test2"));
            appender.append(helpers.createLogEntry("test3"));
        }).not.toThrow();
    });
});
