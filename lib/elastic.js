'use strinct';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var elasticsearch = require('elasticsearch');
;
class ElasticResult {
}
exports.ElasticResult = ElasticResult;
class ElasticsearchMapper {
    constructor(host, port, index, type) {
        this.host = host;
        this.port = port;
        this.index = index;
        this.type = type;
        console.log(host + ":" + port);
        this.client = new elasticsearch.Client({
            host: host + ":" + port,
            log: 'trace'
        });
    }
    insert(obj, callback) {
        this.client.create({
            index: this.index,
            type: this.type,
            id: obj.id,
            body: obj
        }, callback);
    }
    /**
     * 指定のIDつきオブジェクトを保存する。
     * @param obj
     * @return 保存結果を表すプロミス
     */
    promiseInsert(obj) {
        let self = this;
        let ret = new Promise(function (resolve) {
            self.client.create({
                index: self.index,
                type: self.type,
                id: obj.id,
                body: obj
            }, function (error, result) {
                let o = new ElasticResult();
                if (error) {
                    console.log("this %j", error);
                    o.error = error;
                }
                else {
                    console.log("that");
                    o.error = null;
                }
                o.result = result;
                resolve(o);
            });
        });
        return ret;
    }
    /**
     *
     * @param obj
     * @param callback
     */
    bulk(obj, callback) {
        this.client.index({
            index: this.index,
            type: this.type,
            body: obj
        }, callback);
    }
    /**
     * 指定のIDなしオブジェクトを保存する。
     * @param obj
     * @return 保存結果を表すプロミス
     */
    promiseBulk(obj) {
        var self = this;
        var ret = new Promise(function (resolve) {
            self.client.index({
                index: self.index,
                type: self.type,
                body: obj
            }, function (error, result) {
                let o = new ElasticResult();
                if (error) {
                    console.log("this");
                    o.error = error;
                }
                else {
                    console.log("that");
                    o.error = null;
                }
                o.result = result;
                resolve(o);
            });
        });
        return ret;
    }
    update(obj, callback) {
        this.client.index({
            index: this.index,
            type: this.type,
            id: obj.id,
            body: obj
        }, callback);
    }
    /**
     * 指定のIDつきオブジェクトをアップデートする。
     * @param obj オブジェクト
     * @return アップデート結果のプロミス
     */
    promiseUpdate(obj) {
        let self = this;
        let ret = new Promise(function (resolve) {
            self.client.index({
                index: self.index,
                type: self.type,
                id: obj.id,
                body: obj
            }, function (error, result) {
                let o = new ElasticResult();
                o.error = error;
                o.result = result;
                resolve(o);
            });
        });
        return ret;
    }
    delete(id, callback) {
        this.client.delete({
            index: this.index,
            type: this.type,
            id: id,
        }, callback);
    }
    /**
     * 指定したドキュメントを削除する。
     * @param id 削除したいドキュメントのID
     */
    promiseDelete(id) {
        let self = this;
        let ret = new Promise(function (resolve) {
            self.client.delete({
                index: this.index,
                type: this.type,
                id: id,
            }, function (error, result) {
                let o = new ElasticResult();
                o.error = error;
                o.result = result;
                resolve(o);
            });
        });
        return ret;
    }
    search(query, callback) {
        this.client.search({
            index: this.index,
            size: 0,
            q: query
        }, function (error, result) {
            if (error) {
                callback(error, null);
            }
            else {
                this.client.search({
                    index: this.index,
                    size: result.hits.length,
                    q: query
                }, callback);
            }
        });
    }
    /**
     * 指定のクエリを行う。
     * @param query 検索文
     * @return 検索結果
     */
    promiseSearch(query) {
        let self = this;
        let ret = new Promise(function (resolve) {
            self.client.search({
                index: self.index,
                size: 0,
                q: query
            }, function (error, result) {
                if (error) {
                    let o = new ElasticResult();
                    o.error = error;
                    o.result = result;
                    resolve(o);
                }
                else {
                    self.client.search({
                        index: self.index,
                        size: result.hits.length,
                        q: query
                    }, function (error, result) {
                        let o = new ElasticResult();
                        if (!error) {
                            o.error = error;
                        }
                        else {
                            o.error = null;
                        }
                        o.result = result;
                        resolve(o);
                    });
                }
            });
        });
        return ret;
    }
    /**
     *
     */
    promiseDrop() {
        let self = this;
        let ret = new Promise(function (resolve) {
            self.client.indices.delete({
                index: self.index
            }, function (error, result) {
                let o = new ElasticResult();
                if (error) {
                    o.error = error;
                }
                else {
                    o.error = null;
                }
                o.result = result;
                resolve(o);
            });
        });
        return ret;
    }
}
exports.ElasticsearchMapper = ElasticsearchMapper;
class ElasticSearch {
    constructor() {
    }
    getMapper(host, port, index, type) {
        var ret = new ElasticsearchMapper(host, port, index, type);
        return ret;
    }
}
exports.ElasticSearch = ElasticSearch;
