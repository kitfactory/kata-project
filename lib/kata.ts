
export enum IssueStatus{
    open,
    close
}
/*
|項目|内容|
|:--|:--|
|timestamp|時間|
|total|項目数|
|ok|合格項目数|
|ng|NG項目数|
|json|オリジナルJSONのデータ|
*/
export class Item {
    public timestamp:Date;
    public total:number;
    public ok:number;
    public ng:number;
    public json:any;
}


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
export class Issue{
    public title:string;
    public description:string;
    public startdate:Date;
    public duedate:Date;
    public progress:number;
    public status:IssueStatus;
    public assignee:string;
    public estimation:number;
    public url:string;
    public label:string[];
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
export class Progress{
    public timestamp:Date;
    public total:number;
    public planned:number;
    public progress:number;
}

/**
 * 
 * 
 */
export class Snapshot{
    public timestamp:Date;
    public json:any;
}


export class KataUtil {

    /**
     * 指定のラベルだけにする。
     * @param label 
     * @param issue 
     */
    filterIssues( label:string , issue:Issue[] ) :Issue[]{
        let ret:Issue[] = [];
        let i = 0;
        let j = 0;

        loop1:
        for( i = 0 ; i < issue.length ; i++ ){
            if( issue[i].label ){
                for( j = 0 ; j < issue[i].label.length ; j++ ){
                    if( label === issue[i].label[j] ){
                        ret.push( issue[i] );
                        continue loop1;
                    }
                }
            }
        }
        return ret;
    }

    /**
     * 
     * @param issue 
     */
    calculateProgress( issue:Issue[] ):Progress{
        let ret = new Progress();
        let i = 0;
        let total = 0;
        let planned = 0;
        let done = 0;
        let current = new Date().getMilliseconds();
        for( i = 0 ; i < issue.length ; i++ ){
            total = total + issue[i].estimation;
            //終了していればdoneに追加
            if( issue[i].progress == 100 ){
                done = done + issue[i].estimation;
            }
            //完了しているはずであればplannedに追加
            if( issue[i].duedate.getMilliseconds() <= current ){
                planned = planned + issue[i].estimation;
            }
        }
        ret.total = total;
        ret.planned = planned;
        ret.progress = done;
        return ret;
    }

    /**
     * 
     * @param issue 
     */
    calculateUnfinishedTaskForEachMember( issue:Issue[] ):Snapshot {
        let ret = new Snapshot();
        ret.json = {};
        ret.timestamp = new Date();
        let current = ret.timestamp.getMilliseconds();
        let i = 0;
        for( i = 0 ; i < issue.length ; i++ ){
            let assignee = issue[i].assignee;
            if( ! ret.json[assignee] ){
                ret.json[assignee] = 0;
            }           
            //完了しているはずで、未完了分を追加
            if( issue[i].duedate.getMilliseconds() <= current ){
                if( issue[i].progress !== 100 ){
                    ret.json[assignee] = ret.json[assignee] + (issue[i].progress*issue[i].estimation);
                }
            }
        }
        return ret;
    }

    /**
     * 
     * @param issue 
     */
    countOpenIssuesForEachMember( issue:Issue[] ){
        let ret = new Snapshot();
        ret.json = {};
        let i = 0;
        for( i = 0 ; i < issue.length ; i++ ){
            let assignee = issue[i].assignee;
            if( ! ret.json[assignee] ){
                ret.json[assignee] = 0.0;
            }
            if( issue[i].progress !== 100.0 ){
                ret.json[assignee] = ret.json[assignee] + 1;
            }
        }
    }
}
