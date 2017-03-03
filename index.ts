var gitlab = require('./lib/gitlab.js');
var github = require('./lib/github.js');
var elastic = require( './lib/elastic.js');


//not implemented.
var redmine = {};
var exel = {};

var issue:Issue = new Issue();





/*

module.exports =　function(){

    var ret =  {};

    ret.Issue = Issue;
    ret.Snapshot = Snapshot;
    ret.Progress = Progress;


    ret.initElastic = function( host, port ){
        ret.elastic = {};
        ret.elastic.host = host;
        ret.elastci.port = port;
    }

    var issue = {};
    issue.GitLab2Elastic = function( project , dest ){
        gitlab.getProjectIssue( project );




    };





    var calc = {};







    
    ret.issue = issue;
    ret.calc = calc;
    return ret;
}();

*/
