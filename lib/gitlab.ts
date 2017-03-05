'use strict';
import { Issue } from './kata';

var request = require('request');
const PROPERTY_START = "--";
const PROPERTY_END = "--";

const START_DATE = "開始日";
const PROGRESS = "進捗";
const ESTIMATION = "見積";

export class GitLab {
    apiURL:string;
    key:string;

    constructor(){
    }

    init = ( apiURL:string , key:string)=>{
        this.apiURL = apiURL;
        this.key = key;
    }

    recursiveGet =( baseUrl:string , items:Array<any> , page:number , callback:Function )=>{
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

    getProjectIssuesAsync(project:string , callback:Function ){
        var base =  this.apiURL+"/projects/"+project+"/issues?private_token="+this.key;
        this.recursiveGet( base , [] , 1 , callback );
    };

    /**
     * Promiseで取得する。
     * @param project
     */
    getProjectIssue( project:string ): Promise<any> {
        var self:GitLab = this;
        var ret = new Promise( function(resolve:Function){
            self.getProjectIssuesAsync(project,function( error , items ){
                var ret ={};
                if( items !== null ){
                    let i:number;
                    let issues = [];
                    for( i = 0 ;  i < items.length ; i++ ){
                        issues.push( self.getDescriptionProperties( items[i] ));
                    }
                    resolve( {"error":null , "item":issues} );                
                }else{
                    resolve( {"error":error , "item":null } );
                }
            });
        });
        return ret;
    }

    /**
     * 
     */
    getDescriptionProperties( issue:any   ){
        var properties:any = {};
        var description = issue.description;
        var line = description.split("\n");
        var pattern = /--.*--/;
        var i = 0;

        for( i = 0 ;  i < line.length ; i++ ){
            console.log( line[i] );
            var match = line[i].match(pattern);
            if( match ){
                if( i+1 < line.length ){
                    var key = match[0].replace( /--/g , "" );
                    var val = line[i+1].trim();
                    console.log("key " + key );
                    if( key === START_DATE ){
                        properties.startdate = val;
                        var d = new Date( val );
                        console.log("startdate:" + d );
                    }
                    if( key === ESTIMATION ){
                        properties.estimation = val;
                        console.log("estimation:"+val);
                    }
                    if( key === PROGRESS ){
                        properties.progress = val;
                        console.log("progress:"+val);
                    }

                    properties[key]=val;                    
                }
            }
        }

        var ret:Issue = new Issue();
        ret.title = issue.title;
        ret.description = description;
        if( issue.assignee ){
            ret.assignee = issue.assignee.username;
        }
        if( issue.due_date ){
            let due = new Date( issue.due_date );
            due.setHours( 23 );
            due.setMinutes( 59 );
            console.log( "due_date" + due.toUTCString() );
            ret.duedate = due;
        }
        if( issue.web_url ){
            ret.url = issue.web_url;
        }
        if( issue.labels ){
            ret.label = issue.labels;
        }
        ret.json = issue;

        if( properties.startdate ){
            ret.startdate = properties.startdate;
        }
        if( properties.progress ){
            ret.progress = parseFloat( properties.progress );
        }
        if( issue.state ){
            ret.status = issue.state;
            if( issue.state == "closed "){
                ret.progress = 100;
            }
        }

        if( properties.estimation ){
            ret.estimation = properties.estimation;
        }

        console.log( "issue obj %j " , ret );
        return ret;
    };
}
