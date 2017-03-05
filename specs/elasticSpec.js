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
var mapper = elastic.getMapper("localhost", 9200, "testi", "test");
var obj = {
    id: 1,
    title: "title",
    description: "description",
    date: "2016-11-30",
};
console.log("get mapper ");
describe("async-test in zone", () => {
    async_await_jasmine_1.$it("in zone", () => __awaiter(this, void 0, void 0, function* () {
        console.log("hello");
    }));
});
function async_log(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("[async] " + msg);
    });
}
/*

describe( "insert&update&delete" ,()=>{
    it( "delete" , function( done ){
        mapper.delete( obj.id , function(error,result){
         console.log( "delete test" );
            expect( true ).toBe( error == null );
            done();
        });
    });

    it( "insert" , function( done ){
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
