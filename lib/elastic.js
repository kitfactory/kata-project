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
        let ret = new Promise(function (resolve, reject) {
            self.client.create({
                index: self.index,
                type: self.type,
                id: obj.id,
                body: obj
            }, function (error, result) {
                let o = new ElasticResult();
                o.result = result;
                if (error) {
                    o.error = error;
                    reject(o);
                }
                else {
                    o.error = null;
                    resolve(o);
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
        var ret = new Promise(function (resolve, reject) {
            self.client.index({
                index: self.index,
                type: self.type,
                body: obj
            }, function (error, result) {
                let o = new ElasticResult();
                o.result = result;
                if (error) {
                    o.error = error;
                    reject(o);
                }
                else {
                    o.error = null;
                    resolve(o);
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
        let ret = new Promise(function (resolve, reject) {
            self.client.index({
                index: self.index,
                type: self.type,
                id: obj.id,
                body: obj
            }, function (error, result) {
                let o = new ElasticResult();
                o.result = result;
                if (error) {
                    o.error = error;
                    reject(o);
                }
                else {
                    o.error = null;
                    resolve(o);
                }
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
        let ret = new Promise(function (resolve, reject) {
            self.client.delete({
                index: this.index,
                type: this.type,
                id: id,
            }, function (error, result) {
                let o = new ElasticResult();
                o.result = result;
                if (error) {
                    o.error = error;
                    reject(o);
                }
                else {
                    o.error = null;
                    resolve(o);
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
        let ret = new Promise(function (resolve, reject) {
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
                        o.result = result;
                        if (error) {
                            o.error = error;
                            reject(o);
                        }
                        else {
                            o.error = null;
                            resolve(o);
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
    promiseDrop() {
        let self = this;
        let ret = new Promise(function (resolve, reject) {
            self.client.indices.delete({
                index: self.index
            }, function (error, result) {
                let o = new ElasticResult();
                o.result = result;
                if (error) {
                    o.error = error;
                    reject(o);
                }
                else {
                    o.error = null;
                    resolve(o);
                }
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
    /**
     * 初期化をする。
     * @param host Elasticsearchのホスト
     * @param port Elasticsearchのポート
     */
    init(host, port) {
        this.host = host;
        this.port = port;
    }
    /**
     *
     * @param name
     * @param type
     * @param obj
     */
    saveObject(name, type, obj) {
        let m = this.getMapper(this.host, this.port, name, type);
        return m.promiseBulk(obj);
    }
    /**
     * Issueオブジェクトを保存する。
     * @param name
     * @param issue
     */
    saveIssue(name, issue) {
        let m = this.getMapper(this.host, this.port, name, name + "Issue");
        return m.promiseBulk(issue);
    }
    ;
    /**
     * Snapshotオブジェクトを保存する。
     * @param name Snapshotオブジェクトにつける名前(インデックス)
     * @param obj
     */
    saveSnapshot(name, obj) {
        let m = this.getMapper(this.host, this.port, name, name + "Snapshot");
        return m.promiseBulk(obj);
    }
    /**
     * Progressオブジェクトを保存する。
     * @param name Snapshotオブジェクトにつける名前(インデックス)
     * @param obj
     */
    saveProgress(name, obj) {
        let m = this.getMapper(this.host, this.port, name, name + "Progress");
        return m.promiseBulk(obj);
    }
    /**
     * 最新としてオブジェクトを保存する。
     * @param name インデックス名
     * @param obj 保存オブジェクト
     */
    saveLatestObject(name, obj) {
        let copy = Object.assign({}, obj);
        copy.id = 1;
        let type = name + "_latest";
        let m = this.getMapper(this.host, this.port, name, type);
        return m.promiseBulk(copy);
    }
}
exports.ElasticSearch = ElasticSearch;
