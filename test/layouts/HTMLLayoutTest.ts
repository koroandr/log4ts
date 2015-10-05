///<reference path="../../typings/jasmine/jasmine.d.ts" />

import HTMLLayout from "../../src/layouts/HTMLLayout";
import {LogEntry} from "../../src/LogEntry";
import {LogLevel} from "../../src/LogLevel";
import {HTMLLayoutColors, HTMLLayoutColorTheme} from "../../src/layouts/HTMLLayout";
describe('HTMLLayout', ()=>{
    var log: LogEntry;
    beforeEach(()=>{
        log = {
            message: 'test message',
            level: LogLevel.ERROR,
            tag: 'tag',
            time: new Date(Date.parse("21 May 2015 10:12:42"))
        };
    });
    it('by default, formats without colors', ()=>{
        var layout = new HTMLLayout();
        expect(layout.format(log)).toEqual('<span>2015-05-21 10:12:42</span> <span>ERROR</span> <span>[tag]</span> <span>test message</span>')
    });

    describe('color themes', ()=>{
        var layout: HTMLLayout;
        function testColors(colors: HTMLLayoutColors) {
            expect(layout.format(log)).toBe('<span style="color: ' + colors.time +
                '">2015-05-21 10:12:42</span> <span style="color: ' + colors.level +
                '">ERROR</span> <span style="color: ' + colors.tag +
                '">[tag]</span> <span style="color: ' + colors.message + '">test message</span>');
        }
        it('light', ()=>{
            layout = new HTMLLayout(HTMLLayoutColorTheme.LIGHT);
            testColors({
                time: 'black',
                level: 'dark red',
                tag: 'dark green',
                message: 'black'
            })
        });
        it('dark', ()=>{
            layout = new HTMLLayout(HTMLLayoutColorTheme.DARK);
            testColors({
                time: 'white',
                level: 'red',
                tag: 'green',
                message: 'white'
            })
        });
        it('solarized', ()=>{
            layout = new HTMLLayout(HTMLLayoutColorTheme.SOLARIZED);
            testColors({
                time: '#839496',
                level: '#dc322f',
                tag: '#859900',
                message: '#839496'
            })
        });
        it('custom', ()=>{
            var theme: HTMLLayoutColors = {
                time: '#000001',
                level: '#000002',
                tag: '#000003',
                message: '#000004'
            };
            layout = new HTMLLayout(theme);
            testColors(theme);
        });
    });
});
