'use strict';

var request = require('request');
var kata = require('../index');


const PROPERTY_START = "\*\*";
const PROPERTY_END = "\*\*";

class GitLab {
    apiURL:string;
    key:string;

    constructor(){
    }
    init( apiURL:string , key:string){
        this.apiURL = apiURL;
        this.key = key;
    }

    private recursiveGet( baseUrl:string , items:Array<any> , page:number , callback:Function ){
        var uri =  baseUrl + "&page=" + page;
        var opt = {
            uri: uri
        };
        request.get(opt,function(error,response,body){ 
            if( error ){
                callback( error , null );
            }else{
                var body = JSON.parse( body );
                if( body.length == 0 ){
                    callback( null, items );
                }else{
                    items = items.concat( body );
                    this.recursiveGet( baseUrl , items , page+1 , callback );
                }
            }
        });
    }

    private getProjectIssuesAsync(project:string , callback:Function ){
        var base =  this.apiURL+"/projects/"+project+"/issues?private_token="+this.key;
        this.recursiveGet( base , [] , 1 , callback );
    };

    getProjectIssue( project:string ): Promise<any> {
        var ret = new Promise( function(resolve:Function){
            this.getProjectIssueAsync(project,function( error , items ){
                resolve( error , items );                
            });
        });
        return ret;
    }

    /**
     * 
     */
    getDescriptionProperties= function( issue:any   ){
        var properties = {};
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
        var ret:Issue = new kata.Issue();
        ret.title = issue.title;
        ret.description = issue.description;
        if( properties["progress"] ){
            ret.progress = issue.progress;
        }        
        ret.duedate = issue.duedate;
        ret.startdate = issue.startdate;
        ret.status = issue.status;
        ret.estimation = issue.estimation;
        ret.assignee = issue.assinee;
        ret.json = issue;
        return properties;
    };

}



module.exports = function(){
    return new GitLab();
}();
