'use strinct';
var elasticsearch = require('elasticsearch');
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
    bulk(obj, callback) {
        this.client.index({
            index: this.index,
            type: this.type,
            body: obj
        }, callback);
    }
    update(obj, callback) {
        this.client.index({
            index: this.index,
            type: this.type,
            id: obj.id,
            body: obj
        }, callback);
    }
    delete(id, callback) {
        this.client.delete({
            index: this.index,
            type: this.type,
            id: id,
        }, callback);
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
}
class ElasticSearch {
    constructor() {
    }
    getMapper(host, port, index, type) {
        var ret = new ElasticsearchMapper(host, port, index, type);
        return ret;
    }
}
module.exports = function () {
    return new ElasticSearch();
}();
