
import {GitLab} from "../lib/gitlab";
import {GitLabResult} from "../lib/gitlab";
import {Issue} from "../lib/kata";

// var gitlab = require("../lib/gitlab");
var gitlab = new GitLab();
gitlab.init("https://gitlab.com/api/v3", process.env.GITLAB_TOKEN);
const project_id = "458780";

describe( "gitlab" , function(){
    it( "getIssues" , function( done ){
        console.log("issues");
        gitlab.getProjectIssuesAsync( project_id ,  function(error, result){
            if( error ){
                console.log("error"+error);
            }
            console.log( "total result " + result.length );
            expect(result.length).toBe( 4 );
            done();
        });
    }, 200000 );

    it( "getIssues2" , function( done ){
        console.log("issues2");
        var promise:Promise<GitLabResult> = gitlab.getProjectIssue( project_id );
        promise.then((value:GitLabResult) =>{
            var x:Issue[] = value.issues;
            console.log("end promise -> " + x.length );
            done();
        });
    }, 200000 );
});

