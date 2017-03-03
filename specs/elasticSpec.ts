import {$it} from "../node_modules/async-await-jasmine/dist/src/async-await-jasmine";

var elastic = require("../lib/elastic.js");

var mapper = elastic.getMapper( "localhost" , 9200 , "testi" , "test");

var obj = {
    id: 1,
    title: "title",
    description: "description",
    date:"2016-11-30",
};

console.log("get mapper ");

describe("async-test in zone", () => {
    $it("in zone", async () => {
        console.log("hello");
    });

});

async function async_log(msg:string) {
    console.log("[async] " + msg);
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
