"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const async_await_jasmine_1 = require("../node_modules/async-await-jasmine/dist/src/async-await-jasmine");
const index_1 = require("../index");
var elastic = new index_1.ElasticSearch();
var mapper = elastic.getMapper("localhost", 9200, "test", "test");
var obj = {
    id: 1,
    title: "title",
    description: "description",
    date: "2016-11-30",
};
console.log("get mapper ");
describe("async-test in zone", () => {
    async_await_jasmine_1.$it("in zone", () => __awaiter(this, void 0, void 0, function* () {
        let result = yield async_foo();
        console.log("result = " + result);
        expect(true).toBe(result);
    }));
});
function async_log(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("[async] " + msg);
    });
}
function async_foo() {
    let ret = new Promise(function (resolve) {
        setTimeout(function () {
            console.log("lately!!");
            resolve(true);
        }, 2000);
    });
    return ret;
}
describe("insert&update&delete", () => {
    async_await_jasmine_1.$it("insert", () => __awaiter(this, void 0, void 0, function* () {
        let result = yield mapper.promiseInsert(obj);
        console.log("insert result %j", result);
        expect(result).toBeUndefined(result.error);
    }));
    async_await_jasmine_1.$it("bulk", () => __awaiter(this, void 0, void 0, function* () {
        let i = {
            id: 2,
            title: "title",
            description: "description",
            date: "2016-11-30",
        };
        let result = yield mapper.promiseBulk(i);
        console.log("insert result %j", result);
        expect(result).toBeUndefined(result.error);
    }));
    async_await_jasmine_1.$it("drop", () => __awaiter(this, void 0, void 0, function* () {
        let result = yield mapper.promiseDrop();
        console.log("drop result %j", result);
        expect(result).toBeUndefined(result.error);
    }));
});
/*
        mapper.insert( obj , function(error,result){
         console.log( "insert test" );
            expect( true ).toBe( error == null );
            done();
        });
    });

    it( "update" , function( done ){
        obj.title = "title2";
        mapper.update( obj , function(error,result){
         console.log( "update test" );
            expect( true ).toBe( error == null );
            done();
        });
    });

    it( "search" , function( done ){
        obj.title = "title2";
        mapper.search( "id:1" , function(error,result){
         console.log( "search test");
            expect( true ).toBe( error == null );
            expect( true ).toBe( result.hits.hits.length == 1 );
            done();
        });
    });

});

*/
