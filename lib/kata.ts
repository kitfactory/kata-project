import * as Configstore from  'configstore';
import {ElasticSearch} from './elastic';
import {ElasticsearchMapper} from './elastic';
import {ElasticResult} from './elastic';

export class MemberState{
    public name:string;
    public issues:Issue[];
    public progress:Progress;
}

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
|unfinished|timestamp時点未完了タスク|
*/
export class Progress{
    public timestamp:Date;
    public total:number;
    public planned:number;
    public progress:number;
    public unfinished:number;
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

    public testTime:Date = null;

    public config:Configstore = null;

    constructor(){
    }

    private elasticHost:string;
    private elasticPort:number;
    private elastic:ElasticSearch;

    initElasticSearch( host:string , port:number ){
        this.elasticHost = host;
        this.elasticPort = port;
        this.elastic = new ElasticSearch();
    }

    getCurrentTime():number {
        if( this.testTime ){
            return this.testTime.getTime();
        }else{
            return new Date().getTime();
        }
    }

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
     * 進捗を計算する。
     * @param issue 
     */
    calculateProgress( issue:Issue[] ):Progress{
        let ret = new Progress();
        let i = 0;
        let total = 0;
        let planned = 0;
        let done = 0;
        let current = this.getCurrentTime();
        for( i = 0 ; i < issue.length ; i++ ){
            //見積値は常に総和を取る。
            total = total + issue[i].estimation;
            //進捗値を追加
            if( issue[i].progress ){
                done = done + (issue[i].estimation * issue[i].progress / 100.0);
            }
            //完了しているはずであればplannedに追加
            if( issue[i].startdate ){
                console.log( "startdate : " + issue[i].startdate.getTime() );
                console.log( "duedate : " + issue[i].duedate.getTime() );
                console.log( "testtime: " + current );
                let start = issue[i].startdate.getTime();
                let due = issue[i].duedate.getTime();
                //既にタスクは始まった
                if( start <= current ){
                    if( due <= current ){
                        //締め切りも過ぎていたら全てをカウント
                        console.log( "(pattern 1)plan[" + i +"]=" + issue[i].estimation );
                        planned = planned + issue[i].estimation;
                    }else{
                        //締切はまだであれば、時間差で配分
                        let past = (current-start)/(due-start);
                        planned = planned + (issue[i].estimation * past);
                        console.log( "(pattern 2)plan[" + i +"]=" + (issue[i].estimation * past) );
                    }
                }
            }else{
                //開始日設定はない場合は締め切りのみでカウント
                if( issue[i].duedate.getTime() <= current ){
                    planned = planned + issue[i].estimation;
                    console.log( "(pattern 3)plan[" + i +"]=" + issue[i].estimation );
                }
            }
        }
        ret.total = total;
        ret.planned = planned;
        ret.progress = done;
        return ret;
    }

    /**
     * メンバーごとにイシューを振り分け
     * @param issue 
     */
    private groupByMembers( issue:Issue[] ):any{
        let ret = {};
        let i = 0;
        for( i = 0; i < issue.length ; i++ ){
            ;
        }
        return null;
    }

    /**
     * 各メンバー分の未完了タスクを計算する。
     * @param issue 
     */
    calculateUnfinishedTaskForEachMember( issue:Issue[] ):Snapshot {
        let ret = new Snapshot();
        ret.json = {};
        let current = this.getCurrentTime();
        let d = new Date();
        d.setTime( current );
        ret.timestamp = d;
        let i = 0;
        for( i = 0 ; i < issue.length ; i++ ){
            let assignee = issue[i].assignee;
            if( ! ret.json[assignee] ){
                ret.json[assignee] = 0;
            }           
            //完了しているはずのタスクの未完了分を追加
            if( issue[i].duedate.getTime() <= current ){
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

    openGitLab(){
        ;
    }

    saveIssue( name:string , issue:Issue ):Promise<ElasticResult>{
        let m:ElasticsearchMapper = this.elastic.getMapper( this.elasticHost , this.elasticPort , name , name+"Issue" );
        return m.promiseBulk( issue );
    };

    saveSnapshot( name:string , obj:Snapshot ) :Promise<ElasticResult>{
        let m:ElasticsearchMapper = this.elastic.getMapper( this.elasticHost , this.elasticPort , name , name+"Snapshot" );
        return m.promiseBulk( obj );
    }

    saveProgress( name:string , obj:Progress ) : Promise<ElasticResult>{
        let m:ElasticsearchMapper = this.elastic.getMapper( this.elasticHost , this.elasticPort , name , name+"Progress" );
        return m.promiseBulk( obj );
    }
}
