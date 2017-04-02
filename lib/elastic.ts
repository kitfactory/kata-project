'use strinct';
var elasticsearch = require('elasticsearch');

import {Issue} from './kata';
import {Snapshot} from './kata';
import {Progress} from './kata';

export interface ElasticCallback{ ( error:any ,result:any ): void };

export class ElasticResult{
    public error:any;
    public result:any;
}

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

    insert( obj:any , callback:ElasticCallback ){
        this.client.create({
                index: this.index,
                type: this.type,
                id: obj.id,
                body: obj
        },callback);
    }

    /**
     * 指定のIDつきオブジェクトを保存する。
     * @param obj 
     * @return 保存結果を表すプロミス
     */
    promiseInsert( obj:any ): Promise<ElasticResult>{
        let self = this;
        let ret = new Promise<ElasticResult>( function(resolve,reject){
            self.client.create({
                    index: self.index,
                    type: self.type,
                    id: obj.id,
                    body: obj
            },function( error , result){
                let o = new ElasticResult();
                o.result = result;
                if( error ){
                    o.error = error;
                    reject( o );
                }else{
                    o.error = null;
                    resolve( o );
                }
            });
        });
        return ret;
    }

    /**
     * IDなしで保存。
     * @param obj 
     * @param callback 
     */
    bulk( obj:any , callback:ElasticCallback ){
        this.client.index({
            index: this.index,
            type: this.type,
            body: obj
        },callback);
    }

    /**
     * 指定のIDなしオブジェクトを保存する。
     * @param obj 
     * @return 保存結果を表すプロミス
     */
    promiseBulk( obj:any ): Promise<ElasticResult>{
        var self = this;
        var ret = new Promise<ElasticResult>( function( resolve,reject ){
            self.client.index({
                index: self.index,
                type: self.type,
                body: obj
            },function( error , result ){
                        let o = new ElasticResult();
                        o.result = result;
                        if( error ){
                            o.error = error;
                            reject( o );
                        }else{
                            o.error = null;
                            resolve( o );
                        }
            });
        });
        return ret;
    }

    /**
     * 
     * @param obj 更新する。
     * @param callback 
     */
    update( obj:any ,callback:Function ){
            this.client.index({
                index: this.index,
                type: this.type,
                id: obj.id,
                body: obj
            } , callback );
    }

    /**
     * 指定のIDつきオブジェクトをアップデートする。
     * @param obj オブジェクト
     * @return アップデート結果のプロミス
     */
    promiseUpdate( obj:any ):Promise<ElasticResult>{
        let self = this;
        let ret = new Promise<ElasticResult>( function(resolve,reject){
            self.client.index({
                index: self.index,
                type: self.type,
                id: obj.id,
                body: obj
            } , function( error , result ){
                        let o = new ElasticResult();
                        o.result = result;
                        if( error ){
                            o.error = error;
                            reject( o );
                        }else{
                            o.error = null;
                            resolve( o );
                        }
            });
        });
        return ret;
    }

    delete( id:any , callback:Function ){
            this.client.delete({
                index: this.index,
                type: this.type,
                id: id,
            } , callback );
    }

    /**
     * 指定したドキュメントを削除する。
     * @param id 削除したいドキュメントのID
     */
    promiseDelete( id:any ):Promise<ElasticResult>{
        let self = this;
        let ret = new Promise<ElasticResult>(function(resolve,reject){
            self.client.delete({
                index: this.index,
                type: this.type,
                id: id,
            } , function( error, result){
                        let o = new ElasticResult();
                        o.result = result;
                        if( error ){
                            o.error = error;
                            reject( o );
                        }else{
                            o.error = null;
                            resolve( o );
                        }
            });
        });
        return ret;
    }

    /**
     * 指定のqueryで検索する
     * @param query 
     * @param callback 
     */
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

    /**
     * 指定のクエリを行う。
     * @param query 検索文
     * @return 検索結果
     */
    promiseSearch( query:string ) : Promise<ElasticResult>{
        let self = this;
        let ret = new Promise<ElasticResult>(function(resolve ,reject){
            self.client.search({
                index: self.index,
                size: 0,
                q: query
            },function( error , result ){
                if( error ){
                    let o = new ElasticResult();
                    o.error = error;
                    o.result = result;
                    resolve( o );
                }else{
                    self.client.search({
                        index: self.index,
                        size: result.hits.length,
                        q: query
                    }, function( error , result ){
                        let o = new ElasticResult();
                        o.result = result;
                        if( error ){
                            o.error = error;
                            reject( o );
                        }else{
                            o.error = null;
                            resolve( o );
                        }
                    });
                }
            });
        });
        return ret;
    }

    /**
     * 
     */
    promiseDrop():Promise<ElasticResult>{
        let self = this;
        let ret:Promise<ElasticResult> = new Promise<ElasticResult>(function( resolve , reject ){
            self.client.indices.delete({
                index: self.index
            },function( error , result){
                let o = new ElasticResult();
                o.result = result;
                if( error ){
                    o.error = error;
                    reject( o );
                }else{
                    o.error = null;
                    resolve( o );
                }
            });
        });
        return ret;
    }
}

export class ElasticSearch {
    constructor(){
    }

    getMapper(host:string , port:number, index:string , type:string ) :ElasticsearchMapper{
        var ret:ElasticsearchMapper = new ElasticsearchMapper(host,port,index,type);
        return ret;
    }

    private host:string;
    private port:number;

    /**
     * 初期化をする。
     * @param host Elasticsearchのホスト
     * @param port Elasticsearchのポート
     */
    init( host:string , port:number ){
        this.host = host;
        this.port = port;
    }

    /**
     * 
     * @param name 
     * @param type 
     * @param obj 
     */
    saveObject( name:string , type:string , obj:any ):Promise<ElasticResult>{
        let m:ElasticsearchMapper = this.getMapper( this.host , this.port , name , type );
        return m.promiseBulk( obj );
    }

    /**
     * Issueオブジェクトを保存する。
     * @param name 
     * @param issue 
     */
    saveIssue( name:string , issue:Issue ):Promise<ElasticResult>{
        let m:ElasticsearchMapper = this.getMapper( this.host , this.port , name , name+"Issue" );
        return m.promiseBulk( issue );
    };

    /**
     * Snapshotオブジェクトを保存する。
     * @param name Snapshotオブジェクトにつける名前(インデックス)
     * @param obj 
     */
    saveSnapshot( name:string , obj:Snapshot ) :Promise<ElasticResult>{
        let m:ElasticsearchMapper = this.getMapper( this.host , this.port , name , name+"Snapshot" );
        return m.promiseBulk( obj );
    }


    /**
     * Progressオブジェクトを保存する。
     * @param name Snapshotオブジェクトにつける名前(インデックス)
     * @param obj 
     */
    saveProgress( name:string , obj:Progress ) : Promise<ElasticResult>{
        let m:ElasticsearchMapper = this.getMapper( this.host , this.port , name , name+"Progress" );
        return m.promiseBulk( obj );
    }







}

