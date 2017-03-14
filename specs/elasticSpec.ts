import {$it} from "../node_modules/async-await-jasmine/dist/src/async-await-jasmine";

import {ElasticSearch} from "../index";
import {ElasticResult} from "../index";

var elastic = new ElasticSearch();
var mapper = elastic.getMapper( "localhost" , 9200 , "test" , "test");

var obj = {
    id: 1,
    title: "title",
    description: "description",
    date:"2016-11-30",
};

console.log("get mapper ");

describe("async-test in zone", () => {
    $it("in zone", async () => {
        let result = await async_foo();
        console.log("result = " + result );
        expect(true).toBe(result);
    });
});

async function async_log(msg:string) {
    console.log("[async] " + msg);
}

function async_foo():Promise<any>{
    let ret:Promise<any> = new Promise<any>( function(resolve){
        setTimeout( function(){
            console.log( "lately!!");
            resolve( true );
        } , 2000 );
    });
    return ret;
}

describe( "insert&update&delete" ,()=>{

    $it( "insert" , async ()=>{
        let result:ElasticResult = await mapper.promiseInsert( obj );
        console.log( "insert result %j" , result );
        expect(result).toBeUndefined( result.error );        
    });

    $it( "bulk" , async ()=>{
        let i = {
            id: 2,
            title: "title",
            description: "description",
            date:"2016-11-30",
        };
        let result:ElasticResult = await mapper.promiseBulk( i );
        console.log( "insert result %j" , result );
        expect(result).toBeUndefined( result.error );        
    });

    $it( "drop" , async()=>{
        let result:ElasticResult = await mapper.promiseDrop();
        console.log( "drop result %j" , result );
        expect(result).toBeUndefined( result.error );        
    })
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

