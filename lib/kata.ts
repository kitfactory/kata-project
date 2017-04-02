import * as Configstore from  'configstore';
import {ElasticSearch} from './elastic';
import {ElasticsearchMapper} from './elastic';
import {ElasticResult} from './elastic';

export class MemberIssue{
    public name:string;
    public issues:Issue[];
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
export class Issue{
    public title:string;
    public description:string;
    public startdate:Date;
    public duedate:Date;
    public progress:number;
    public rest:number;
    public state:string;
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

export class Kata {

    public testTime:Date = null;

    public config:Configstore = null;

    constructor(){
    }

    private elasticHost:string;
    private elasticPort:number;
    private elastic:ElasticSearch;

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
                let start = issue[i].startdate.getTime();
                let due = issue[i].duedate.getTime();
                //既にタスクは始まった
                if( start <= current ){
                    if( due <= current ){
                        //締め切りも過ぎていたら全てをカウント
                        planned = planned + issue[i].estimation;
                    }else{
                        //締切はまだであれば、時間差で配分
                        let past = (current-start)/(due-start);
                        planned = planned + (issue[i].estimation * past);
                    }
                }
            }else{
                //開始日設定はない場合は締め切りのみでカウント
                if( issue[i].duedate.getTime() <= current ){
                    planned = planned + issue[i].estimation;
                }
            }
        }
        ret.total = total;
        ret.planned = planned;
        ret.progress = done;
        ret.unfinished = ret.planned - ret.progress;
        return ret;
    }

    /**
     * メンバーごとにイシューを分類
     * @param issue 
     */
     getMemberIssue( issue:Issue[] ):MemberIssue[]{
        let tmp:Object = {};
        let i = 0;
        issue.forEach( function( i ){
            if( i.assignee ){
                if( tmp[i.assignee] ){
                    tmp[i.assignee].push( i );
                }else{
                    tmp[i.assignee] = [ i ];
                }
            }
        });
        let ret:MemberIssue[] =[];
        Object.keys( tmp ).forEach( function( k ){
            let t = new MemberIssue();
            t.name = k;
            t.issues = tmp[k];
            ret.push( t );
        });
        return ret;
    }

    /**
     * メンバーごとの進捗を計算する。
     * @param issue
     * @return メンバーごとの状態
     */
    getMemberProgress( issue:Issue[] ):Snapshot{
        let self = this;
        let ret:Snapshot = new Snapshot();
        ret.timestamp = new Date();
        let json = {};
        let mi:MemberIssue[] = this.getMemberIssue( issue );        
        mi.forEach( function( i:MemberIssue ){
            let p:Progress = self.calculateProgress( i.issues );
            json[i.name] = p;
        });
        ret.json = json;
        return ret;
    }

    /**
     * 各メンバーのオープンイシュー数をカウントする。
     * @param issue 
     */
    countOpenIssuesForEachMember( issue:Issue[] ){
        let ret = new Snapshot();
        ret.json = {};
        let i = 0;
        issue.forEach( function( i ){
            let assignee = i.assignee;
            if( ! ret.json[assignee] ){
                ret.json[assignee] = 0.0;
            }
            if( i.progress !== 100.0 ){
                ret.json[assignee] = ret.json[assignee] + 1;
            }
        });
    }

    /**
     * 
     * @param host 
     * @param port 
     */
    initElasticSearch( host:string , port:number ){
        this.elasticHost = host;
        this.elasticPort = port;
        this.elastic = new ElasticSearch();
    }

    /**
     * 
     * @param name 
     * @param type 
     * @param obj 
     */
    saveObject( name:string , type:string , obj:any ):Promise<ElasticResult>{
        let m:ElasticsearchMapper = this.elastic.getMapper( this.elasticHost , this.elasticPort , name , type );
        return m.promiseBulk( obj );
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
