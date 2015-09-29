///<reference path="../typings/jasmine/jasmine.d.ts" />

import {example} from "../src/Example";

describe('Example test', ()=>{
    it('works', ()=>{
        expect(example()).toBe('Hello, world!');
    })
});
