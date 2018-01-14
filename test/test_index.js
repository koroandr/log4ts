var testsContext = require.context(".", true, /Test.ts$/);
testsContext.keys().forEach(testsContext);
