import BaseAppender from "./BaseAppender";
import {IAppender} from "../IAppender";
import {LogEntry} from "../LogEntry";

import * as utils from "../Utils";

export default class DOMAppender extends BaseAppender implements IAppender {
    constructor(id: string, private escape_html: boolean = false, private buffer_size: number = 0) {
        super();
        this.el = document.getElementById(id);
    }
    append(entry:LogEntry) {
        if (!this.el) return;

        var log = this.layout.format(entry);
        this.buffer.push((this.escape_html ? utils.escapeHtml(log) : log));
        if (this.buffer_size && this.buffer.length > this.buffer_size) {
            this.buffer.shift();
        }
        this.el.innerHTML = this.buffer.join('<br/>');
    }

    clear() {
        this.el.innerHTML = '';
        this.buffer = [];
    }

    private buffer: string[] = [];

    private el: HTMLElement;
}
