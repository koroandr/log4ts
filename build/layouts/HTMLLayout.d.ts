import { ILayout } from "../ILayout";
import { LogEntry } from "../LogEntry";
export interface HTMLLayoutColors {
    tag: string;
    message: string;
    time: string;
    level: string;
}
export declare enum HTMLLayoutColorTheme {
    LIGHT = 0,
    DARK = 1,
    SOLARIZED = 2,
}
export default class HTMLLayout implements ILayout {
    constructor(colors_theme?: HTMLLayoutColorTheme | HTMLLayoutColors);
    format(entry: LogEntry): string;
    private getTimeStyle();
    private getLevelStyle();
    private getTagStyle();
    private getMessageStyle();
    private getStyle(color);
    private formatDate(date);
    private colors;
}
