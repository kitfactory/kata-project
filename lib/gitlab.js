'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const kata_1 = require("./kata");
const repository_1 = require("./repository");
const repository_2 = require("./repository");
var request = require('request');
class GitLab extends repository_1.Repository {
    init(apiURL, key, proxy = null) {
        this.apiURL = apiURL;
        this.key = key;
        this.proxy = proxy;
    }
    recursiveGet(baseUrl, items, page, callback) {
        var uri = baseUrl + "&page=" + page;
        var opt = {
            uri: uri
        };
        if (this.proxy != null) {
            opt.proxy = this.proxy;
        }
        var self = this;
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
                    self.recursiveGet(baseUrl, items, page + 1, callback);
                }
            }
        });
    }
    /**
     *
     * @param project
     * @param callback
     */
    getProjectIssuesAsync(project, callback) {
        var base = this.apiURL + "/projects/" + project + "/issues?private_token=" + this.key;
        this.recursiveGet(base, [], 1, callback);
    }
    ;
    /**
     * IssueをPromiseで取得する。
     * @param project (該当プロジェクトのID)
     * @return RepositoryResultのPromise
     */
    getProjectIsssues(project) {
        var self = this;
        var ret = new Promise(function (resolve) {
            self.getProjectIssuesAsync(project, function (error, items) {
                let result = new repository_2.RepositoryResult();
                if (items !== null) {
                    let i;
                    let issues = [];
                    for (i = 0; i < items.length; i++) {
                        let tmp = self.getIssueObject(items[i]);
                        let prop = self.getDescriptionProperties(tmp.description);
                        tmp = self.updateIssueProperties(tmp, prop);
                        issues.push(tmp);
                    }
                    result.error = null;
                    result.issues = issues;
                }
                else {
                    result.error = error;
                    result.issues = null;
                }
                resolve(result);
            });
        });
        return ret;
    }
    getProjectLabels(project) {
        var self = this;
        var base = this.apiURL + "/projects/" + project + "/issues?private_token=" + this.key;
    }
    /**
     * APIから取得されたJSONをもとにIssueオブジェクトを作成する
     * @param issue APIの取得値
     * @return Issueオブジェクト
     */
    getIssueObject(issue) {
        let ret = new kata_1.Issue();
        ret.title = issue.title;
        ret.description = issue.description;
        if (issue.assignee) {
            ret.assignee = issue.assignee.name;
        }
        if (issue.due_date) {
            let due = new Date(issue.due_date);
            due.setHours(23);
            due.setMinutes(59);
            due.setUTCSeconds(59);
            ret.duedate = due;
        }
        if (issue.web_url) {
            ret.url = issue.web_url;
        }
        if (issue.labels) {
            ret.label = issue.labels;
        }
        ret.json = issue;
        return ret;
    }
}
exports.GitLab = GitLab;
