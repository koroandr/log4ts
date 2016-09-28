# Log4ts

Log4ts is a client logging library inspired by Log4j and Log4js.

##Getting started

### Installing from npm

    npm install log4ts --save
    typings install npm:log4ts --save --global

You can now import the majority of the log4ts classes from the 'log4ts' module. E.g.,

    import { Logger, LoggerConfig } from "log4ts";

## Structure

Logger uses **appenders** to display entries.
Each appender uses it's own separate **layout**.
You can consider layout as a formatter, that translates
log entry object to a string of text, that appender should
display or pass somwhere else.

You also can pass formatting function directly to appender,
without implementing <code>ILayout</code> interface.

### Appenders

Currently there are 2 appender:

#### ConsoleAppender
ConsoleAppender appends logs directly to your browser js console.

It has no configurable options.

Import with `import ConsoleAppender from "log4ts/build/appenders/ConsoleAppender";`

#### DOMAppender
DOMAppender appends logs to some DOM element using innerHTML.

It has 2 constructor parameters:

1. id (mandatory) - id of the element logs will be attached to.
2. escape_html (optional, defaults to false) - if set true, logs are html-escaped before being attached.

Import with `import DOMAppender from "log4ts/build/appenders/DOMAppender";`

### Layouts

Currently there are 2 layouts:

#### BasicLayout

BasicLayout formats log entries as follows: <code>{time} {level} [{tag}] - {message}</code>

It has no configurable options.

Import with `import BasicLayout from "log4ts/build/layouts/BasicLayout";`

#### HTMLLayout

HTMLLayout formats time, level, tag and message in span, each with it's own color.
You can configure colors passing to constructor either the name of the color scheme or exact color mapping.

Available color themes:

1. light
2. dark
3. solarized

Color mapping fields:

1. time
2. level
3. tag
4. message

Import with `import HTMLLayout from "log4ts/build/layouts/HTMLLayout";`

## Demo

To run demo page, you can use related grunt task

1. run <code>npm install</code> to install all dependencies
2. run <code>grunt demo</code> to compile ts files and run HTTP server
3. open [http://localhost:9000/demo/index.html](http://localhost:9000/demo/index.html) in browser
