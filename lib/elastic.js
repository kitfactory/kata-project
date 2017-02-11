var elasticsearch = require('elasticsearch');


module.exports = function(){
    var ret = {};


    ret.getMapper = function( host ,port , index ,type  ){
        var mapper = {};
        mapper.host = host;
        mapper.port = port;
        mapper.type = type;
        mapper.index = index;

        mapper.client = new elasticsearch.Client({
            host: 'localhost:9200',
            log: 'trace'
        });

        mapper.insert = function( obj , callback ){
            console.log("create "+obj);

            ret.mapper.client.create({
                index: mapper.index,
                type: "hoge",
                id: obj.id,
                body: obj
            },callback);
        };

        mapper.bulk = function( obj , callback ){
            mapper.client.index({
                index: mapper.index,
                body: obj
            },callback);
        };

        mapper.update = function(obj,callback){
            mapper.client.index({
                index: mapper.index,
                id: obj.id,
                body: obj
            } , callback );
        };

        mapper.delete = function( id , callback ){
            mapper.client.delete({
                index: mapper.index,
                id: id,
            } , callback );
        };

        mapper.search = function( query , callback ){
            mapper.client.search({
                    index: mapper.index,
                    size: 0,
                    q: query
                },
                function( error , result ){
                    if( error ){
                        callback( error , null );
                    }else{
                        mapper.client.search({
                            index: mapper.index,
                            size: result.hits.length,
                            q: query
                        }, callback );
                    }
                }
            );
        };

        ret.mapper = mapper;
        return ret.mapper;

    };

    return ret;
}();