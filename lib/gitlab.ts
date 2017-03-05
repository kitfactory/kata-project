'use strict';
import { Issue } from './kata';

var request = require('request');
const PROPERTY_START = "+*";
const PROPERTY_END = "*+";
const START_DATE = "開始日";
const PROGRESS = "進捗";

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
        var pattern = /\*\*.*\*\*/;
        var i = 0;

        for( i = 0 ;  i < line.length ; i++ ){
            console.log( line[i] );
            var match = line[i].match(pattern);
            if( match ){
                if( i+1 < line.length ){
                    var key = match[0].replace( /\*\*/g , "" );
                    var val = line[i+1];
                    properties[key]=val;
                }
            }
        }
        var ret:Issue = new Issue();
        ret.title = issue.title;
        ret.description = description;
        ret.assignee = issue.assignee;
        ret.duedate = issue.duedate;
        ret.status = issue.status;

        if( properties.progress ){
            ret.progress = properties.progress;
        }


        ret.startdate = issue.startdate;
        ret.estimation = issue.estimation;
        ret.assignee = issue.assinee;
        ret.json = issue;
        return ret;
    };
}
