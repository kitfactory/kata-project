/*
|項目|内容|
|:--|:--|
|timestamp|時間|
|total|項目数|
|ok|合格項目数|
|ng|NG項目数|
|json|オリジナルJSONのデータ|
*/
declare class Item {
    public timestamp:Date;
    public total:number;
    public ok:number;
    public ng:number;
    public json:any;
};


/*
|項目|内容|
|:--|:--|
|ID|ID|
|title|タイトル|
|description|記載|
|label|ラベル(配列)|
|startdate|開始日|
|duedate|締切日|
|progress|進捗(%)|
|status|open/close|
|assignee|担当者|
|estimation|見積工数|
|json|オリジナルのJSONデータ|
*/
declare class Issue{
    constructor(){

    }
    public title:string;
    public description:string;
    public startdate:Date;
    public duedate:Date;
    public progress:number;
    public status:IssueStatus;
    public assignee:string;
    public estimation:number;
    public json:any;
}

/*
|項目|内容|
|:--|:--|
|timestamp|時間|
|total|合計見積|
|planned|timestamp時点計画値|
|progress|timestamp時点実績値|
*/
declare class Progress{
    public timestamp:Date;
    public total:number;
    public planned:number;
    public progress:number;
}

/**
 * 
 * 
 */
class Snapshot{
    public timestamp:Date;
    public json:any;
}



