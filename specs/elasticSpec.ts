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

describe( "insert&bulk&update&delete&drop" ,()=>{

    it( "insert" , async function(done){
        let result:ElasticResult = await mapper.promiseInsert( obj );
        console.log( "insert result %j" , result );
        expect( result.error ).toBeNull();
        done();
    }, 2000 );

    it( "bulk" , async function( done ){
        console.log( "bulk test" );
        let result:ElasticResult =  await mapper.promiseBulk( obj );
        expect(result.error ).toBeNull();
        done();
    },2000 );

    it( "update" , async function( done ){
        console.log( "update test" );
        let result:ElasticResult =  await mapper.promiseUpdate( obj );
        expect(result.error ).toBeNull();
        done();
    });

    it( "drop" , async function( done ){
        let result:ElasticResult = await mapper.promiseDrop();
        console.log( "drop result %j" , result );
        expect( result.error ).toBeNull();
        done();
    },2000);
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

