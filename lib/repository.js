"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PROPERTY_START = "--";
const PROPERTY_END = "--";
const START_DATE = "開始日";
const PROGRESS = "進捗";
const ESTIMATION = "見積";
const ACTUALTIME = "実施";
const DUEDATE = "終了日";
class RepositoryResult {
}
exports.RepositoryResult = RepositoryResult;
class Repository {
    constructor() {
    }
    /**
     * Issueの記載からプロパティを取得する。
     * @param description イシューの記載
     * @return プロパティ
     */
    getDescriptionProperties(description) {
        var properties = {};
        var line = description.split("\n");
        var pattern = /--.*--/;
        var i = 0;
        for (i = 0; i < line.length; i++) {
            // console.log( "description : " + line[i] );
            var match = line[i].match(pattern);
            if (match) {
                if (i + 1 < line.length) {
                    var key = match[0].replace(/--/g, "");
                    var val = line[i + 1].trim();
                    if (key.indexOf(START_DATE) !== -1) {
                        properties.startdate = val;
                        var d = new Date(val);
                    }
                    if (key.indexOf(ESTIMATION) !== -1) {
                        properties.estimation = Number(val);
                    }
                    if (key.indexOf(PROGRESS) !== -1) {
                        properties.progress = Number(val);
                    }
                    if (key.indexOf(DUEDATE) !== -1) {
                        let due = new Date(val);
                        due.setHours(23);
                        due.setMinutes(59);
                        due.setUTCSeconds(59);
                        properties.duedate = due;
                    }
                    properties[key] = val;
                }
            }
        }
        return properties;
    }
    ;
    updateIssueProperties(issue, properties) {
        if (properties.startdate != null) {
            issue.startdate = new Date(properties.startdate);
        }
        if (properties.progress != null) {
            issue.progress = properties.progress;
        }
        if (properties.estimation != null) {
            issue.estimation = properties.estimation;
        }
        if (properties.duedate != null) {
            issue.duedate = properties.duedate;
        }
        if (issue.state != null) {
            if (issue.state == "closed ") {
                issue.progress = 100;
            }
        }
        if (issue.progress != null && issue.estimation != null) {
            issue.rest = issue.estimation - (issue.estimation * issue.progress / 100);
        }
        return issue;
    }
}
exports.Repository = Repository;
