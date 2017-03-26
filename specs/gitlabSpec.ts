
import {GitLab} from "../lib/gitlab";
import {Issue} from "../lib/kata";
import {Repository} from "../lib/repository";
import {RepositoryResult} from "../lib/repository";

// var gitlab = require("../lib/gitlab");
var gitlab = new GitLab();
gitlab.init("https://gitlab.com/api/v3", process.env.GITLAB_TOKEN);
const project_id = "458780";

describe( "gitlab" , function(){
    it( "getIssues" , function( done ){
        console.log("gitlab issues1");
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
        console.log("gitlab issues2");
        var promise:Promise<RepositoryResult> = gitlab.getProjectIsssues( project_id );
        promise.then((value:RepositoryResult) =>{
            var x:Issue[] = value.issues;
            console.log("end promise -> " + x.length );
            done();
        });
        console.log("gitlab done" );
    }, 200000 );




    it( "gitlab template" , function( done){
        let template:string = GitLab.createIssueTemplate("https://gitlab.com/kitfactory/test/","title","description",null,["103140","161263"],true,true,true);
        console.log( "gitlab issue template " + template);
    });
});

