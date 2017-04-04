"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kata_1 = require("./kata");
const repository_1 = require("./repository");
const repository_2 = require("./repository");
var request = require('request');
/**
 * curl https://api.github.com/repos/kitfactory/kata-test/issues?access_token=891986eaa2383498581f5056b182a1032170dec3&filter=all
 */
class GitHub extends repository_1.Repository {
    init(apiURL, user, token) {
        this.apiURL = apiURL;
        this.token = token;
        this.user = user;
    }
    recursiveGet(baseUrl, items, page, callback) {
        var uri = baseUrl + "&page=" + page;
        var opt = {
            uri: uri,
            headers: {
                'User-Agent': 'kata-project'
            }
        };
        console.log(uri);
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
        var base = this.apiURL + this.user + "/" + project + "/issues?access_token=" + this.token + "&filter=all";
        this.recursiveGet(base, [], 1, callback);
    }
    ;
    /**
     *
     * @param project
     */
    getProjectIsssues(project) {
        let self = this;
        let ret = new Promise(function (resolve) {
            self.getProjectIssuesAsync(project, function (error, items) {
                let result = new repository_2.RepositoryResult();
                if (error) {
                    result.error = error;
                    result.issues = null;
                }
                else {
                    let issues = [];
                    items.forEach(function (i) {
                        let issue = self.getIssueObject(i);
                        let props = self.getDescriptionProperties(issue.description);
                        let updated = self.updateIssueProperties(issue, props);
                        issues.push(updated);
                    });
                    result.issues = issues;
                    result.error = null;
                }
                resolve(result);
            });
        });
        return ret;
    }
    /**
     * サーバーなどの応答からイシュー情報を
     * @param item サーバー応答などのイシューの情報となるオブジェクト
     */
    getIssueObject(item) {
        let ret = new kata_1.Issue();
        //console.log( "json %j" , item );
        //ret.json = item;
        ret.url = item.url;
        ret.title = item.title;
        if (item.assignee) {
            ret.assignee = item.assignee.login;
        }
        if (item.labels.length == 0) {
            ret.label = null;
        }
        else {
            let l = [];
            item.labels.forEach(function (i) {
                l.push(i.name);
            });
            ret.label = l;
        }
        ret.description = item.body;
        ret.state = item.state;
        return ret;
    }
}
exports.GitHub = GitHub;
/*
{"json":
{"url":"https://api.github.com/repos/kitfactory/kata-test/issues/1","repository_url":"https://api.github.com/repos/kitfactory/kata-test","labels_url":"https://api.github.com/repos/kitfactory/kata-test/issues/1/labels{/name}","comments_url":"https://api.github.com/repos/kitfactory/kata-test/issues/1/comments","events_url":"https://api.github.com/repos/kitfactory/kata-test/issues/1/events","html_url":"https://github.com/kitfactory/kata-test/issues/1","id":216277749,"number":1,"title":"イシュー1","user":{"login":"kitfactory","id":1540291,"avatar_url":"https://avatars1.githubusercontent.com/u/1540291?v=3","gravatar_id":"","url":"https://api.github.com/users/kitfactory","html_url":"https://github.com/kitfactory","followers_url":"https://api.github.com/users/kitfactory/followers","following_url":"https://api.github.com/users/kitfactory/following{/other_user}",
"gists_url":"https://api.github.com/users/kitfactory/gists{/gist_id}",
"starred_url":"https://api.github.com/users/kitfactory/starred{/owner}{/repo}",
"subscriptions_url":"https://api.github.com/users/kitfactory/subscriptions",
"organizations_url":"https://api.github.com/users/kitfactory/orgs",
"repos_url":"https://api.github.com/users/kitfactory/repos",
"events_url":"https://api.github.com/users/kitfactory/events{/privacy}",
"received_events_url":"https://api.github.com/users/kitfactory/received_events","type":"User","site_admin":false},"labels":[{"id":567179181,
"url":"https://api.github.com/repos/kitfactory/kata-test/labels/bug","name":"bug","color":"ee0701","default":true},{"id":567179182,"url":"https://api.github.com/repos/kitfactory/kata-test/labels/duplicate","name":"duplicate","color":"cccccc","default":true}],
"state":"open",
"locked":false,
"assignee":{"login":"kitfactory","id":1540291,"avatar_url":"https://avatars1.githubusercontent.com/u/1540291?v=3",
"gravatar_id":"","url":"https://api.github.com/users/kitfactory",
"html_url":"https://github.com/kitfactory",
"followers_url":"https://api.github.com/users/kitfactory/followers",
"following_url":"https://api.github.com/users/kitfactory/following{/other_user}",
"gists_url":"https://api.github.com/users/kitfactory/gists{/gist_id}",
"starred_url":"https://api.github.com/users/kitfactory/starred{/owner}{/repo}",
"subscriptions_url":"https://api.github.com/users/kitfactory/subscriptions",
"organizations_url":"https://api.github.com/users/kitfactory/orgs",
"repos_url":"https://api.github.com/users/kitfactory/repos",
"events_url":"https://api.github.com/users/kitfactory/events{/privacy}",
"received_events_url":"https://api.github.com/users/kitfactory/received_events","type":"User","site_admin":false},
"assignees":[{"login":"kitfactory","id":1540291,"avatar_url":"https://avatars1.githubusercontent.com/u/1540291?v=3",
"gravatar_id":"","url":"https://api.github.com/users/kitfactory",
"html_url":"https://github.com/kitfactory",
"followers_url":"https://api.github.com/users/kitfactory/followers",
"following_url":"https://api.github.com/users/kitfactory/following{/other_user}",
"gists_url":"https://api.github.com/users/kitfactory/gists{/gist_id}",
"starred_url":"https://api.github.com/users/kitfactory/starred{/owner}{/repo}",
"subscriptions_url":"https://api.github.com/users/kitfactory/subscriptions",
"organizations_url":"https://api.github.com/users/kitfactory/orgs",
"repos_url":"https://api.github.com/users/kitfactory/repos",
"events_url":"https://api.github.com/users/kitfactory/events{/privacy}",
"received_events_url":"https://api.github.com/users/kitfactory/received_events",
"type":"User","site_admin":false}],
"milestone":null,"comments":0,"created_at":"2017-03-23T03:13:25Z",
"updated_at":"2017-03-23T03:20:37Z","closed_at":null,
"body":"テストイシューです。\r\n\r\n## --見積--\r\n20\r\n\r\n## --進捗--\r\n80\r\n\r\n## --開始日--\r\n2016-12-31\r\n\r\n## --締切日--\r\n2017-01-31\r\n "},"url":"https://api.github.com/repos/kitfactory/kata-test/issues/1","title":"イシュー1","assignee":"kitfactory","label":["bug","duplicate"],"state":"open"}
*/
