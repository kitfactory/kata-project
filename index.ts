var gitlab = require('./lib/gitlab.js');
var github = require('./lib/github.js');
var elastic = require( './lib/elastic.js');

//Kata
var Issue = require('./lib/issue.js');
var Snapshot = require('./lib/snapshot.js');
var Progress = require('./lib/progress.js');

import {Foo} from "./lib/kata";

//not implemented.
var redmine = {};
var exel = {};

exports.Issue = Issue;
exports.Snapshot = Snapshot;
exports.Progress = Progress;
exports = {Foo};

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
