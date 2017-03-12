'use strinct';
var elasticsearch = require('elasticsearch');

export class ElasticsearchMapper {
    host:string;
    port:number;
    index:string;
    type:string;
    client:any;

    constructor( host:string , port:number , index:string, type:string ){
        this.host = host;
        this.port = port;
        this.index = index;
        this.type = type;
        console.log(host + ":" + port );
        this.client = new elasticsearch.Client({
            host: host+":"+port,
            log: 'trace'
        });
    }

    insert( obj:any , callback:Function ){
        this.client.create({
                index: this.index,
                type: this.type,
                id: obj.id,
                body: obj
        },callback);
    }

    /**
     * 
     * @param obj 
     * @param callback 
     */
    bulk( obj:any , callback:Function ){
        this.client.index({
            index: this.index,
            type: this.type,
            body: obj
        },callback);
    }

    bulkPromise( obj:any ){
        var c = this.client;
        var ret = new Promise<string>( function( resuolve ){
        c.index({
            index: this.index,
            type: this.type,
            body: obj
        },function(){

        });

        });
    }

    update( obj:any ,callback:Function ){
            this.client.index({
                index: this.index,
                type: this.type,
                id: obj.id,
                body: obj
            } , callback );
    }

    delete( id:any , callback:Function ){
            this.client.delete({
                index: this.index,
                type: this.type,
                id: id,
            } , callback );
    }

    search( query:string , callback:Function ){
        this.client.search({
            index: this.index,
            size: 0,
            q: query
        },function( error , result ){
            if( error ){
                    callback( error , null );
            }else{
                this.client.search({
                    index: this.index,
                    size: result.hits.length,
                    q: query
                }, callback );
            }
        });
    }


}

export class ElasticSearch {
    constructor(){
    }

    getMapper(host:string , port:number, index:string , type:string ) :ElasticsearchMapper{
        var ret:ElasticsearchMapper = new ElasticsearchMapper(host,port,index,type);
        return ret;
    }
}

