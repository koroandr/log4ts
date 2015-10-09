# Log4ts

Log4ts is a logging library inspired by Log4j and Log4js

It's currently in develop, but I look forward to finish it in October.

##Getting started

TODO

## Structure

Logger uses **appenders** to display entries.
Each appender uses it's own separate **layout**.
You can consider layout as a formatter, that translates
log entry object to a string of text, that appender should
display or pass somwhere else.

You also can pass formatting function directly to appender,
without implementing <code>ILayout</code> interface.

### Appenders

Currently there is only one appender:

1. **ConsoleAppender** appends logs directly to your browser js console.

### Layouts

Currently there 2 layouts:

#### BasicLayout

**BasicLayout** formats log entries as follows: <code>{time} {level} [{tag}] - {message}</code>

It has no configurable options.

#### HTMLLayout

**HTMLLayout** formats time, level, tag and message in span, each with it's own color.
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

## Demo

To run demo page, you can use related grunt task

1. run <code>npm install</code> to install all dependencies
2. run <code>grunt demo</code> to compile ts files and run HTTP server
3. open [http://localhost:9000/demo/index.html](http://localhost:9000/demo/index.html) in browser
