///<reference path="../typings/jasmine/jasmine.d.ts" />
import {stringify} from "../src/Utils";

describe('Utils', ()=>{
    describe('stringify', ()=>{
        it('stringifies plain object', ()=>{
            var obj = { a: 1, b: 'text', c: true};

            expect(stringify(obj, 1)).toEqual(JSON.stringify(obj, null, 2));
        });

        it('stringifies plain object with given deep', ()=>{
            var obj = {
                a: 1,
                b: {
                    b1: 2,
                    b2: 3,
                    b3: {
                        c: 4
                    }
                }
            };

            var result = {
                a: 1,
                b: {
                    b1: 2,
                    b2: 3
                }
            };

            expect(stringify(obj, 2)).toEqual(JSON.stringify(result, null, 2));
        });

        it('stringifies recursive object', ()=>{
            var obj = { a: 1, b: null };
            obj.b = obj;

            var result = {
                a: 1,
                b: {
                    a: 1,
                    b: {
                        a: 1
                    }
                }
            };

            expect(stringify(obj, 3)).toEqual(JSON.stringify(result, null, 2));
        });
    });
});
