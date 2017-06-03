'use strict';
import { Issue } from './kata';
import {Repository} from './repository';
import {RepositoryResult} from './repository';
import * as moment from "moment";

var request = require('request');

export class Redmine extends Repository{
    apiURL:string;
    key:string;
    proxy:string;

    public init( apiURL:string , key:string , proxy:string = null ){
        this.apiURL = apiURL;
        this.key = key;
        this.proxy = proxy;
    }

    private recursiveGet( baseUrl:string , items:Array<any> , page:number , callback:Function ){
        var uri =  baseUrl + "&page=" + page;
        var opt:any = {
            uri: uri
        };
        if( this.proxy != null ){
            opt.proxy = this.proxy;
        }
        var self = this;
        request.get(opt,function(error,response,body){ 
            if( error ){
                callback( error , null );
            }else{
                var body = JSON.parse( body );
                if( body.length == 0 ){
                    callback( null, items );
                }else{
                    items = items.concat( body );
                    self.recursiveGet( baseUrl , items , page+1 , callback );
                }
            }
        });
    }

    /**
     * 
     * @param project 
     * @param callback 
     */
    public getProjectIssuesAsync(project:string , callback:Function ){
        var base =  this.apiURL+"/projects/"+project+"/issues?private_token="+this.key;
        this.recursiveGet( base , [] , 1 , callback );
    };

    /**
     * IssueをPromiseで取得する。
     * @param project (該当プロジェクトのID)
     * @return RepositoryResultのPromise
     */
    public getProjectIsssues( project:string ): Promise<RepositoryResult> {
        var self:Redmine = this;
        var ret = new Promise( function(resolve:Function){
            self.getProjectIssuesAsync(project,function( error , items ){
                let result:RepositoryResult = new RepositoryResult();
                if( items !== null ){
                    let i:number;
                    let issues = [];
                    for( i = 0 ;  i < items.length ; i++ ){
                        let tmp:Issue = self.getIssueObject( items[i] );
                        let prop:any = self.getDescriptionProperties( tmp.description );
                        tmp= self.updateIssueProperties(tmp,prop);
                        issues.push( tmp );
                    }
                    result.error = null;
                    result.issues = issues;
                }else{
                    result.error = error;
                    result.issues = null;
                }
                resolve( result );                
            });
        });
        return ret;
    }

    protected getProjectLabels( project:string ){
        var self:Redmine = this;
        var base =  this.apiURL+"/projects/"+project+"/issues?private_token="+this.key;
    }

    /**
     * APIから取得されたJSONをもとにIssueオブジェクトを作成する
     * @param issue APIの取得値
     * @return Issueオブジェクト
     */
    protected getIssueObject( issue:any ) :Issue {
        let ret:Issue = new Issue();
        ret.title = issue.title;
        ret.description = issue.description;
        if( issue.assignee != null ){
            ret.assignee = issue.assignee.name;
        }
        if( issue.due_date != null ){
            let due = new Date( issue.due_date );
            due.setHours( 23 );
            due.setMinutes( 59 );
            due.setUTCSeconds( 59 );
            ret.duedate = due;
        }
        if( issue.web_url != null ){
            ret.url = issue.web_url;
        }
        if( issue.labels != null ){
            ret.label = issue.labels;
        }
        if( issue.state != null ){
            ret.state = issue.state;
        }

        ret.json = issue;
        return ret;
    }

}
