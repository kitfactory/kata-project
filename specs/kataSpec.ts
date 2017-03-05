import {KataUtil} from "../index";
import {Issue} from "../index";

describe( "issue_test" , function(){
    it( "issue_filter" , function(){
        var i = new Issue();
        i.label = ["x","y","z"];
        var j = new Issue();
        j.label = ["x","y"];

        var issues:Issue[] = [ i , j ];

        let util:KataUtil = new KataUtil();
        let x = util.filterIssues( "x" , issues );
        console.log( "x length" + x.length );
        let z = util.filterIssues( "foo" , issues );
        console.log( "foo length" + z.length ); 
    });

    



});
