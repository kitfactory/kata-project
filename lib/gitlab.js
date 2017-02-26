var request = require('request');
/// reference path="./kata.ts"

const PROPERTY_START = "\*\*";
const PROPERTY_END = "\*\*";
class GitLab {
    constructor() {
        /**
         *
         */
        this.getDescriptionProperties = function (issue) {
            var properties = {};
            var description = issue.description;
            var line = description.split("\n");
            var pattern = /\*\*.*\*\*/;
            var i = 0;
            for (i = 0; i < line.length; i++) {
                console.log(line[i]);
                var match = line[i].match(pattern);
                if (match) {
                    if (i + 1 < line.length) {
                        var key = match[0].replace(/\*\*/g, "");
                        var val = line[i + 1];
                        properties[key] = val;
                    }
                }
            }
            var ret = new Issue();
            ret.title = issue.title;
            ret.description = issue.description;
            if (properties["progress"]) {
                ret.progress = issue.progress;
            }
            ret.duedate = issue.duedate;
            ret.startdate = issue.startdate;
            ret.status = issue.status;
            ret.estimation = issue.estimation;
            ret.assignee = issue.assinee;
            ret.json = issue;
            return properties;
        };
    }
    init(apiURL, key) {
        this.apiURL = apiURL;
        this.key = key;
    }
    recursiveGet(baseUrl, items, page, callback) {
        var uri = baseUrl + "&page=" + page;
        var opt = {
            uri: uri
        };
        request.get(opt, function (error, response, body) {
            if (error) {
                callback(error, null);
            }
            else {
                var body = JSON.parse(body);
                if (body.length == 0) {
                    callback(null, items);
                }
                else {
                    items = items.concat(body);
                    this.recursiveGet(baseUrl, items, page + 1, callback);
                }
            }
        });
    }
    getProjectIssuesAsync(project, callback) {
        var base = this.apiURL + "/projects/" + project + "/issues?private_token=" + this.key;
        this.recursiveGet(base, [], 1, callback);
    }
    ;
    getProjectIssue(project) {
        var ret = new Promise(function (resolve) {
            this.getProjectIssueAsync(project, function (error, items) {
                resolve(error, items);
            });
        });
        return ret;
    }
}
module.exports = function () {
    return new GitLab();
}();
