import {MSProject,ExportResult,Issue} from '../index';

describe("msproject", function(){

    it( "msproject1" ,function( done ){
        let msp:MSProject = new MSProject();

        msp.saveIssueList( null , null );

    });

});
