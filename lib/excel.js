"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exporter_1 = require("./exporter");
const fs = require("fs");
var officegen = require('officegen');
const TITLES = [
    "タイトル",
    "担当",
    "開始日",
    "終了日",
    "工数",
    "進捗",
    "URL"
];
/**
 * Excelに保存する
 */
class Excel extends exporter_1.Exporter {
    saveIssueList(issues, file) {
        console.log("excel write issues");
        let xlsx = officegen('xlsx');
        let r = new exporter_1.ExportResult();
        let self = this;
        let p = new Promise(function (resolve) {
            xlsx.on('finalize', function (written) {
                console.log("Excel Done !!" + written);
                r.error = null;
                r.result = written;
                resolve(r);
            });
            xlsx.on('error', function (err) {
                console.log("Excel Error !!" + err);
                r.error = err;
                r.result = null;
                resolve(r);
            });
            var sheet = xlsx.makeNewSheet();
            sheet.name = 'kata-project-export';
            self.setTitle(sheet);
            self.setIssueContent(sheet, issues);
            var out = fs.createWriteStream(file);
            out.on('error', function (err) {
                console.log("Excel Error !!" + err);
                r.error = err;
                r.result = null;
                resolve(r);
            });
            xlsx.generate(out);
        });
        return p;
    }
    /**
     *
     * @param sheet
     */
    setTitle(sheet) {
        let i = 0;
        sheet.data[0] = [];
        for (i = 0; i < TITLES.length; i++) {
            sheet.data[0][i] = TITLES[i];
        }
    }
    toString(d) {
        let s = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
        return s;
    }
    /**
     *
     * @param sheet
     * @param issues
     */
    setIssueContent(sheet, issues) {
        let i = 0;
        for (i = 0; i < issues.length; i++) {
            sheet.data[i + 1] = [];
            sheet.data[i + 1][0] = issues[i].title;
            sheet.data[i + 1][1] = issues[i].assignee;
            sheet.data[i + 1][2] = this.toString(issues[i].startdate);
            sheet.data[i + 1][3] = this.toString(issues[i].duedate);
            sheet.data[i + 1][4] = issues[i].estimation;
            sheet.data[i + 1][5] = issues[i].progress;
            sheet.data[i + 1][6] = issues[i].url;
        }
    }
}
exports.Excel = Excel;
