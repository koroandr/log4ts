import {ILayout} from "../ILayout";
import {LogEntry} from "../LogEntry";
import {logLevelToString} from "../LogLevel";
import {stringify} from "../Utils";

/**
 * Simple layout, that formats logs as
 * "{time} {level} [{tag}] - {message}"
 */
export default class BasicLayout implements ILayout {
    format(entry:LogEntry, include_data: boolean):string {
        return `${this.formatDate(entry.time)} ${logLevelToString(entry.level)} [${entry.tag}] - ${entry.message}${include_data? " " + this.formatData(entry): ''}`;
    }

    formatData(entry:LogEntry):string {
        if (typeof entry.object !== "undefined") {
            return stringify(entry.object, entry.deep || 1);
        }

        return '';
    }

    private formatDate(date:Date):string {
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
}
