"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ExportResult {
}
exports.ExportResult = ExportResult;
exports.ISSUE_SAVE_PROPERTY = {
    "TITLE": "title",
    "ASSIGNEE": "assignee",
    "STARTDATE": "startdate",
    "DUEDATE": "duedate",
    "ESTIMATION": "estimation",
    "PROGRESS": "progress",
    "URL": "url",
    "ID": "id"
};
exports.GANTTPROJECT_ROWS = [
    exports.ISSUE_SAVE_PROPERTY.ID,
    exports.ISSUE_SAVE_PROPERTY.TITLE,
    exports.ISSUE_SAVE_PROPERTY.STARTDATE,
    exports.ISSUE_SAVE_PROPERTY.DUEDATE,
    exports.ISSUE_SAVE_PROPERTY.ASSIGNEE,
    exports.ISSUE_SAVE_PROPERTY.PROGRESS,
    exports.ISSUE_SAVE_PROPERTY.ESTIMATION,
    exports.ISSUE_SAVE_PROPERTY.URL
];
exports.ISSUE_SAVE_TITLE = {
    "title": "名前",
    "assignee": "責任者",
    "startdate": "開始日",
    "duedate": "終了日",
    "progress": "進捗",
    "estimation": "Cost",
    "url": "ウェブリンク",
    "id": "ID"
};
class Exporter {
}
exports.Exporter = Exporter;
