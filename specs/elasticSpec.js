var elastic = require("../lib/elastic.js");

var mapper = elastic.getMapper( "localhost" , 9200 , "test" , "test");

var obj = {
    id: 1,
    title: "title",
    description: "description",
    date:"2016-11-30",
};

describe( "insert&update&delete" ,function(){
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
         console.log( "search test" + error);
            expect( true ).toBe( error == null );
            expect( true ).toBe( result.hits.hits.length == 1 );
            done();
        });
    });


});




