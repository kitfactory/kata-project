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
describe("insert&bulk&update&delete&drop", () => {
    it("insert", function (done) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield mapper.promiseInsert(obj);
            console.log("insert result %j", result);
            expect(result.error).toBeNull();
            done();
        });
    }, 2000);
    it("bulk", function (done) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("bulk test");
            let result = yield mapper.promiseBulk(obj);
            expect(result.error).toBeNull();
            done();
        });
    }, 2000);
    it("update", function (done) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("update test");
            let result = yield mapper.promiseUpdate(obj);
            expect(result.error).toBeNull();
            done();
        });
    });
    it("drop", function (done) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield mapper.promiseDrop();
            console.log("drop result %j", result);
            expect(result.error).toBeNull();
            done();
        });
    }, 2000);
});
/*
    $it( "bulk" , async ()=>{
        let i = {
            id: 2,
            title: "title",
            description: "description",
            date:"2016-11-30",
        };
        let result:ElasticResult = await mapper.promiseBulk( i );
        console.log( "insert result %j" , result );
    });

    $it( "drop" , async()=>{
        let result:ElasticResult = await mapper.promiseDrop();
        console.log( "drop result %j" , result );
    })
});
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
