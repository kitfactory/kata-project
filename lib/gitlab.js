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
                    items = items.concat( body );
                    recursiveGet( baseUrl , items , page+1 , callback );
                }
            }
        });
    };

    ret.getProjectIssues = function(project , callback ){
        var base =  ret.apiURL+"/projects/"+project+"/issues?private_token="+ret.key;
        recursiveGet( base , [] , 1 , callback );
    };

    const PROPERTY_START = "\*\*";
    const PROPERTY_END = "\*\*";

    /**
     * 
     */
    ret.getDescriptionProperties= function( issue  ){
        var properties = {};
        var description = issue.description;
        var line = description.split("\n");
        var pattern = /\*\*.*\*\*/;

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
        return properties;
    };


    ret.getProjectMembers = function(project){
        console.log("getMember");
    };

    return ret;
}();
