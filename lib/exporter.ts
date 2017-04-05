import {Issue} from './kata';

export class ExportResult{
    public error:any;
    public result:any;
}

export const ISSUE_SAVE_PROPERTY = {

    "TITLE":"title",

    "ASSIGNEE": "assignee",

    "STARTDATE":"startdate",

    "DUEDATE":"duedate",

    "ESTIMATION":"estimation",

    "PROGRESS":"progress",

    "URL":"url",

    "ID":"id"
}

export const GANTTPROJECT_ROWS = [
    ISSUE_SAVE_PROPERTY.ID,
    ISSUE_SAVE_PROPERTY.TITLE,
    ISSUE_SAVE_PROPERTY.STARTDATE,
    ISSUE_SAVE_PROPERTY.DUEDATE,
    ISSUE_SAVE_PROPERTY.ASSIGNEE,
    ISSUE_SAVE_PROPERTY.PROGRESS,
    ISSUE_SAVE_PROPERTY.ESTIMATION,
    ISSUE_SAVE_PROPERTY.URL
];

export const ISSUE_SAVE_TITLE = {

    "title" : "名前",

    "assignee":"責任者",

    "startdate":"開始日",

    "duedate":"終了日",

    "progress":"進捗",

    "estimation":"Cost",

    "url":"ウェブリンク",

    "id":"ID"
};


export abstract class Exporter{

    /**
     * イシューリストを保存する
     * @param issues イシュー
     * @return 保存結果のPromise
     */
    public abstract saveIssueList( issues:Issue[] , file:string ):Promise<ExportResult>;

}