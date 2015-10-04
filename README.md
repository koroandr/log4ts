# Log4ts

Log4ts is a logging library inspired by Log4j and Log4js



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

Currently there is only one layout:

1. **BasicLayout** formats log entries as follows: <code>{time} {level} [{tag}] - {message}</code>

## Demo

To run demo page, you can use related grunt task

1. run <code>npm install</code> to install all dependencies
2. run <code>grunt demo</code> to compile ts files and run HTTP server
3. open [http://localhost:9000/demo/index.html](http://localhost:9000/demo/index.html) in browser
