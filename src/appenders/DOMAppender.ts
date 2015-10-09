import BaseAppender from "./BaseAppender";
import {IAppender} from "../IAppender";
import {LogEntry} from "../LogEntry";

import * as utils from "../Utils";

export default class DOMAppender extends BaseAppender implements IAppender {
    constructor(id: string, private escape_html: boolean = false) {
        super();
        this.el = document.getElementById(id);
    }
    append(entry:LogEntry) {
        var log = this.layout.format(entry);
        this.el.innerHTML += (this.escape_html ? utils.escapeHtml(log) : log) + '<br>';
    }

    clear() {
        this.el.innerHTML = '';
    }

    private el: HTMLElement;
}
