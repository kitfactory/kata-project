var request = require('request');

module.exports = function( option ){
    var ret = {};

    ret.apiURL = null;

    ret.init = function (apiURL,key){
        ret.apiURL = apiURL;
        ret.key = key;
    }

    function recursiveGet( baseUrl , items , page , callback ){
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
                    items.push( body );
                    recursiveGet( baseUrl , items , page+1 , callback );
                }
            }
        });
    }

    ret.getProjectIssues = function(project , callback ){
        var base =  ret.apiURL+"/projects/"+project+"/issues?private_token="+ret.key;
        recursiveGet( base , [] , 1 , callback );
    }

    ret.getProjectMembers = function(project){
        console.log("getMember");
    }


    

    return ret;
}();
