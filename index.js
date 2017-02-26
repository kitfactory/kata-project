var gitlab = require('./lib/gitlab.js');
var github = require('./lib/github.js');
var elastic = require( './lib/elastic.js');

//not implemented.
var redmine = {};
var exel = {};

module.exports =　function(){

    var ret =  {};
    ret.initElastic = function( host, port ){
        ret.elastic = {};
        ret.elastic.host = host;
        ret.elastci.port = port;
    }

    // issue
    var issue = {};
    issue.GitLab2Elastic = function( project , dest ){
        gitlab.getProjectIssue( project );




    };





    var calc = {};







    
    ret.issue = issue;
    ret.calc = calc;
    return ret;
}();
