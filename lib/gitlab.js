var request = require('request');

module.exports = function( option ){
    var ret = {};

    ret.apiURL = null;

    ret.init = function (apiURL,key){
        ret.apiURL = apiURL;
        ret.key = key;
    }

    ret.getRecursiveGet = function(){
        
    }

    ret.getProjectIssues = function(project){
        var uri =  ret.apiURL+"/projects/"+project+"/issues?private_token="+ret.key;
        var opt = {
            uri: uri
        };


        console.log( uri );
        request.get(opt,function(error,response,body){ console.log(body)});
    }

    ret.getProjectMembers = function(project){
        console.log("getMember");
    }

    return ret;
}();
