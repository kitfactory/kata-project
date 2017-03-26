import {GitHub} from '../index';
import {RepositoryResult} from '../index';

var token = process.env.GITHUB_TOKEN;
var base = "https://api.github.com/repos/";
var user = "kitfactory";
var project = "kata-test";
///issues?access_token=891986eaa2383498581f5056b182a1032170dec3&filter=all

describe( "github" , function(){
    it( "github" , async function(done){
        var github:GitHub = new GitHub();
        github.init( base , user , token );
        let p:RepositoryResult = await github.getProjectIsssues( project );
        expect( p.issues.length ).toBe( 21 );
        done();
    },20000);
});