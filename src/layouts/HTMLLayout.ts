import {ILayout} from "../ILayout";
import {LogEntry} from "../LogEntry";
import {LogLevel} from "../LogLevel";
import {stringify} from "../Utils";

export interface HTMLLayoutColors {
    tag: string;
    message: string;
    time: string;
    level: string;
}

export enum HTMLLayoutColorTheme {
    LIGHT,
    DARK,
    SOLARIZED
}

export default class HTMLLayout implements ILayout {

    constructor(colors_theme?: HTMLLayoutColorTheme | HTMLLayoutColors) {
        if (colors_theme === HTMLLayoutColorTheme.LIGHT) {
            this.colors = {
                time: 'black',
                level: 'dark red',
                tag: 'dark green',
                message: 'black'
            }
        } else if (colors_theme === HTMLLayoutColorTheme.DARK) {
            this.colors = {
                time: 'white',
                level: 'red',
                tag: 'green',
                message: 'white'
            };
        } else if (colors_theme === HTMLLayoutColorTheme.SOLARIZED) {
            this.colors = {
                time: '#839496',
                level: '#dc322f',
                tag: '#859900',
                message: '#839496'
            };
        } else {
            this.colors = <HTMLLayoutColors>colors_theme;
        }
    }
    format(entry:LogEntry, include_data: boolean):string {
        let res =  '<span' + this.getTimeStyle() + '>' + this.formatDate(entry.time) + '</span> ' +
            '<span' + this.getLevelStyle() + '>' + LogLevel[entry.level] + '</span> ' +
            '<span' + this.getTagStyle() + '>[' + entry.tag + ']</span> ' +
            '<span' + this.getMessageStyle() + '>' + entry.message +  '</span>';

        if(include_data) {
            res += '<pre>' + this.formatData(entry) + '</pre>';
        }

        if(entry.stack) {
            let formatted = this.formatStack(entry.stack);

            if(formatted) {
                res += '<pre>' + formatted + '</pre>';
            }
        }

        return res;
    }

    formatData(entry:LogEntry):string {
        if (typeof entry.object !== "undefined") {
            return stringify(entry.object, entry.deep || 1);
        }
    }

    private formatStack(stack: any):string {

        if(stack && stack.split) {
            return stack.split('\n').join('<br />');
        }

        return null;
    }

    private getTimeStyle() {
        if (!this.colors) {
            return '';
        }
        return this.getStyle(this.colors.time);
    }
    private getLevelStyle() {
        if (!this.colors) {
            return '';
        }
        return this.getStyle(this.colors.level);
    }
    private getTagStyle() {
        if (!this.colors) {
            return '';
        }
        return this.getStyle(this.colors.tag);
    }
    private getMessageStyle() {
        if (!this.colors) {
            return '';
        }
        return this.getStyle(this.colors.message);
    }

    private getStyle(color: string): string {
        return ' style="color: ' + color + '"';
    }

    private formatDate(date: Date): string {
        function pad(number) {
            if (number < 10) {
                return '0' + number;
            }
            return number;
        }

        return date.getFullYear() +
            '-' + pad(date.getMonth() + 1) +
            '-' + pad(date.getDate()) +
            ' ' + pad(date.getHours()) +
            ':' + pad(date.getMinutes()) +
            ':' + pad(date.getSeconds());
    }

    private colors: HTMLLayoutColors;
}
