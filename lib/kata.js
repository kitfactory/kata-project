"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const elastic_1 = require("./elastic");
class MemberIssue {
}
exports.MemberIssue = MemberIssue;
var IssueStatus;
(function (IssueStatus) {
    IssueStatus[IssueStatus["open"] = 0] = "open";
    IssueStatus[IssueStatus["close"] = 1] = "close";
})(IssueStatus = exports.IssueStatus || (exports.IssueStatus = {}));
/*
|項目|内容|
|:--|:--|
|timestamp|時間|
|total|項目数|
|ok|合格項目数|
|ng|NG項目数|
|json|オリジナルJSONのデータ|
*/
class Item {
}
exports.Item = Item;
/*
Issueデータを表すクラス
|項目|内容|
|:--|:--|
|ID|ID|
|title|タイトル|
|description|記載|
|label|ラベル(配列)|
|startdate|開始日|
|duedate|締切日|
|progress|進捗(%)|
|rest|残り|
|status|open/close|
|assignee|担当者|
|estimation|見積工数|
|json|オリジナルのJSONデータ|
*/
class Issue {
}
exports.Issue = Issue;
/*
|項目|内容|
|:--|:--|
|timestamp|時間|
|total|合計見積|
|planned|timestamp時点計画値|
|progress|timestamp時点実績値|
|unfinished|timestamp時点未完了タスク|
*/
class Progress {
}
exports.Progress = Progress;
/**
 *
 *
 */
class Snapshot {
}
exports.Snapshot = Snapshot;
class Kata {
    constructor() {
        this.testTime = null;
        this.config = null;
    }
    getCurrentTime() {
        if (this.testTime) {
            return this.testTime.getTime();
        }
        else {
            return new Date().getTime();
        }
    }
    /**
     * 指定のラベルだけにする。
     * @param label
     * @param issue
     */
    filterIssues(label, issue) {
        let ret = [];
        let i = 0;
        let j = 0;
        loop1: for (i = 0; i < issue.length; i++) {
            if (issue[i].label) {
                for (j = 0; j < issue[i].label.length; j++) {
                    if (label === issue[i].label[j]) {
                        ret.push(issue[i]);
                        continue loop1;
                    }
                }
            }
        }
        return ret;
    }
    /**
     * 進捗を計算する。
     * @param issue
     */
    calculateProgress(issue) {
        let ret = new Progress();
        let i = 0;
        let total = 0;
        let planned = 0;
        let done = 0;
        let current = this.getCurrentTime();
        let closed = 0;
        for (i = 0; i < issue.length; i++) {
            //見積値は常に総和を取る。
            total = total + issue[i].estimation;
            //進捗値を追加
            if (issue[i].progress != null) {
                done = done + (issue[i].estimation * issue[i].progress / 100.0);
                if (issue[i].progress == 100) {
                    closed = closed++;
                }
            }
            //完了しているはずであればplannedに追加
            if (issue[i].startdate) {
                let start = issue[i].startdate.getTime();
                let due = issue[i].duedate.getTime();
                //既にタスクは始まった
                if (start <= current) {
                    if (due <= current) {
                        //締め切りも過ぎていたら全てをカウント
                        planned = planned + issue[i].estimation;
                    }
                    else {
                        //締切はまだであれば、時間差で配分
                        let past = (current - start) / (due - start);
                        planned = planned + (issue[i].estimation * past);
                    }
                }
            }
            else {
                //開始日設定はない場合は締め切りのみでカウント
                if (issue[i].duedate.getTime() <= current) {
                    planned = planned + issue[i].estimation;
                }
            }
        }
        ret.total = total;
        ret.planned = planned;
        ret.progress = done;
        ret.unfinished = ret.planned - ret.progress;
        ret.items = issue.length;
        ret.closed = closed;
        return ret;
    }
    /**
     * メンバーごとにイシューを分類
     * @param issue
     */
    getMemberIssue(issue) {
        let tmp = {};
        let i = 0;
        issue.forEach(function (i) {
            if (i.assignee) {
                if (tmp[i.assignee]) {
                    tmp[i.assignee].push(i);
                }
                else {
                    tmp[i.assignee] = [i];
                }
            }
        });
        let ret = [];
        Object.keys(tmp).forEach(function (k) {
            let t = new MemberIssue();
            t.name = k;
            t.issues = tmp[k];
            ret.push(t);
        });
        return ret;
    }
    /**
     * メンバーごとの進捗を計算する。
     * @param issue
     * @return メンバーごとの状態
     */
    getMemberProgress(issue) {
        let self = this;
        let ret = new Snapshot();
        ret.timestamp = new Date();
        let json = {};
        let mi = this.getMemberIssue(issue);
        mi.forEach(function (i) {
            let p = self.calculateProgress(i.issues);
            json[i.name] = p;
        });
        ret.json = json;
        return ret;
    }
    /**
     * 各メンバーのオープンイシュー数をカウントする。
     * @param issue
     */
    countOpenIssuesForEachMember(issue) {
        let ret = new Snapshot();
        ret.json = {};
        let i = 0;
        issue.forEach(function (i) {
            let assignee = i.assignee;
            if (!ret.json[assignee]) {
                ret.json[assignee] = 0.0;
            }
            if (i.progress !== 100.0) {
                ret.json[assignee] = ret.json[assignee] + 1;
            }
        });
    }
    /**
     *
     * @param host
     * @param port
     */
    initElasticSearch(host, port) {
        this.elasticHost = host;
        this.elasticPort = port;
        this.elastic = new elastic_1.ElasticSearch();
    }
    /**
     *
     * @param name
     * @param type
     * @param obj
     */
    saveObject(name, type, obj) {
        let m = this.elastic.getMapper(this.elasticHost, this.elasticPort, name, type);
        return m.promiseBulk(obj);
    }
    saveIssue(name, issue) {
        let m = this.elastic.getMapper(this.elasticHost, this.elasticPort, name, name + "Issue");
        return m.promiseBulk(issue);
    }
    ;
    saveSnapshot(name, obj) {
        let m = this.elastic.getMapper(this.elasticHost, this.elasticPort, name, name + "Snapshot");
        return m.promiseBulk(obj);
    }
    saveProgress(name, obj) {
        let m = this.elastic.getMapper(this.elasticHost, this.elasticPort, name, name + "Progress");
        return m.promiseBulk(obj);
    }
}
exports.Kata = Kata;
