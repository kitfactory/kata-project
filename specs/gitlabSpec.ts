import {$it} from "../node_modules/async-await-jasmine/dist/src/async-await-jasmine";

var gitlab = require("../lib/gitlab");
gitlab.init("https://gitlab.com/api/v3", process.env.GITLAB_TOKEN);

const project_id = "458780";

describe( "gitlab" , function(){

    $it( "propery" , async ()=>{
        var issue:any = {};
        issue.description = "**見積もり**\n5.0h";        
        gitlab.getDescriptionProperties( issue );
    });

});
/*

    it( "getIssues" , function( done ){
        var ret = await gitlab.getProjectIssues( project_id );
        done();

        , function(error, result){
            console.log( "total result " + result.length );
            expect(true).toBe( result.length == 2 );
        });
        done();
    }, 100000 );

});
*/

