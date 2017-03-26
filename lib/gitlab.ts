'use strict';
import { Issue } from './kata';
import {Repository} from './repository';
import {RepositoryResult} from './repository';
import * as moment from "moment";

var request = require('request');

const START_DATE = "開始日";
const PROGRESS = "進捗";
const ESTIMATION = "見積";
const ACTUALTIME ="実施";

export class GitLab extends Repository{
    apiURL:string;
    key:string;

    init( apiURL:string , key:string){
        this.apiURL = apiURL;
        this.key = key;
    }

    recursiveGet( baseUrl:string , items:Array<any> , page:number , callback:Function ){
        var uri =  baseUrl + "&page=" + page;
        var opt = {
            uri: uri
        };
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
    getProjectIssuesAsync(project:string , callback:Function ){
        var base =  this.apiURL+"/projects/"+project+"/issues?private_token="+this.key;
        this.recursiveGet( base , [] , 1 , callback );
    };

    /**
     * Promiseで取得する。
     * @param project
     */
    getProjectIsssues( project:string ): Promise<RepositoryResult> {
        var self:GitLab = this;
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

    getProjectLabels( project:string ){
        var self:GitLab = this;
        var base =  this.apiURL+"/projects/"+project+"/issues?private_token="+this.key;


    }

    getIssueObject( issue:any ) :Issue {
        let ret:Issue = new Issue();
        ret.title = issue.title;
        ret.description = issue.description;
        if( issue.assignee ){
            ret.assignee = issue.assignee.username;
        }
        if( issue.due_date ){
            let due = new Date( issue.due_date );
            due.setHours( 23 );
            due.setMinutes( 59 );
            due.setUTCSeconds( 59 );
            ret.duedate = due;
        }
        if( issue.web_url ){
            ret.url = issue.web_url;
        }
        if( issue.labels ){
            ret.label = issue.labels;
        }
        ret.json = issue;
        return ret;
    }

    /**
     * 
     */
    getDescriptionProperties( description:string ):any{
        var properties:any = {};
        var line = description.split("\n");
        var pattern = /--.*--/;
        var i = 0;

        for( i = 0 ;  i < line.length ; i++ ){
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
                    properties[key]=val;                    
                }
            }
        }
        return properties;
    };

    updateIssueProperties( issue:Issue , properties:any ):Issue{
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
