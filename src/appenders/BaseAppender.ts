import {ILayout, ILayoutFunction, IDataFormatFunction} from "../ILayout";

export default class BaseAppender {
    setLayout(layout:ILayout) {
        this.layout = layout;
    }

    setLayoutFunction(layout:ILayoutFunction, format_data: IDataFormatFunction) {
        this.layout = {
            format: layout,
            formatData: format_data
        }
    }

    protected layout:ILayout;
}
