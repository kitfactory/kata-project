import {Issue} from './kata';


const PROPERTY_START = "--";
const PROPERTY_END = "--";

const START_DATE:string = "開始日";
const PROGRESS:string = "進捗";
const ESTIMATION:string = "見積";
const ACTUALTIME:string ="実施";
const DUEDATE:string ="締切日";

export class RepositoryResult{
    error: any;
    issues: Issue[];
}

export abstract class Repository{

    constructor(){

    }

    abstract getProjectIsssues( projectID:string ):Promise<RepositoryResult>;    

    /**
     * サーバーなどの応答からイシュー情報を
     * @param issue サーバー応答などのイシューの情報となるオブジェクト
     */
    abstract getIssueObject( issue:any ) :Issue;

    /**
     * Issueの記載からプロパティを取得する。
     * @param description イシューの記載
     * @return プロパティ
     */
    protected getDescriptionProperties( description:string ):any{
        var properties:any = {};
        var line = description.split("\n");
        var pattern = /--.*--/;
        var i = 0;

        for( i = 0 ;  i < line.length ; i++ ){
            // console.log( "description : " + line[i] );
            var match = line[i].match(pattern);
            if( match ){
                if( i+1 < line.length ){
                    var key = match[0].replace( /--/g , "" );
                    var val = line[i+1].trim();
                    if( key.indexOf(START_DATE)!== -1 ){
                        properties.startdate = val;
                        var d = new Date( val );                        
                    }
                    if( key.indexOf( ESTIMATION )!== -1 ){
                        properties.estimation = Number(val);
                    }
                    if( key.indexOf( PROGRESS )!== -1 ){
                        properties.progress = Number(val);
                    }
                    if( key.indexOf( DUEDATE ) !== -1 ){
                        let due = new Date( val );
                        due.setHours( 23 );
                        due.setMinutes( 59 );
                        due.setUTCSeconds( 59 );
                        properties.duedate = due;
                    }
                    properties[key]=val;                    
                }
            }
        }
        return properties;
    };

    protected updateIssueProperties( issue:Issue , properties:any ):Issue{
        if( properties.startdate ){
            issue.startdate = new Date( properties.startdate );
        }
        if( properties.progress ){
            issue.progress = parseFloat( properties.progress );
        }
        if( properties.estimation ){
            issue.estimation = properties.estimation;
        }
        if( issue.state ){
            if( issue.state == "closed "){
                issue.progress = 100;
            }
        }
       return issue;
    }

}
