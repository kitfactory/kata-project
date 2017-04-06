"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exporter_1 = require("./exporter");
const fs = require("fs");
const ISSUE_TITLE = "ID,名前,開始日,終了日,進捗,Cost,責任者,ウェブリンク\r\n";
const ASSIGNEE_TITLE = "\r\n\r\nID,名前,役割,電子メール,電話番号,割り当てられた役割,Standard rate\r\n";
const ASSINEE_PROPERTIES = [
    "ID",
    "名前",
    "役割",
    "電子メール",
    "電話番号",
    "割り当てられた役割",
    "Standard rate"
];
class GanttProject extends exporter_1.Exporter {
    toString(d) {
        let syear = String(d.getFullYear()).substring(2, 4);
        let month = d.getMonth() + 1;
        let smonth = null;
        if (month < 10) {
            smonth = "0" + month;
        }
        else {
            smonth = String(month);
        }
        let date = d.getDate();
        let sdate = null;
        if (date < 10) {
            sdate = "0" + date;
        }
        else {
            sdate = String(date);
        }
        return syear + "/" + smonth + "/" + sdate;
    }
    /**
     *
     * @param issues
     * @param file
     */
    saveIssueList(issues, file) {
        let self = this;
        let p = new Promise(function (resolve) {
            let w = fs.createWriteStream(file, { encoding: 'utf-8' });
            let assignee = new Set();
            w.on("error", function (err) {
                console.log(err);
            });
            w.on("close", function () {
                console.log("close");
            });
            let i = 0;
            w.write(ISSUE_TITLE);
            for (i = 0; i < issues.length; i++) {
                let s = i + "," + issues[i].title + "," + self.toString(issues[i].startdate) + "," + self.toString(issues[i].duedate) + "," + issues[i].progress + "," + issues[i].estimation + "," + issues[i].assignee + "," + issues[i].url + "\r\n";
                assignee.add(issues[i].assignee);
                w.write(s);
            }
            w.write(ASSIGNEE_TITLE);
            let a = Array.from(assignee);
            for (let i = 0; i < a.length; i++) {
                let s = i + "," + a[i] + ",Default:0,,,,0\r\n";
                w.write(s);
            }
            w.end();
        });
        return p;
    }
}
exports.GanttProject = GanttProject;
