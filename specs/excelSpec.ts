import {Excel,ExportResult,Issue} from '../index';

import * as fs from 'fs';
import * as os from 'os';

describe( "excel" , function(){
    it( "excel export" , async function( done ){

        let i1:Issue = new Issue();
        i1.assignee = "なまえ１";
        i1.title = "たいとる１";
        i1.startdate = new Date();
        i1.duedate = new Date();
        i1.url = "http://xxxxxx/";
        i1.progress = 50;
        i1.estimation = 20;

        let i2:Issue = new Issue();
        i2.assignee = "なまえ２";
        i2.title = "たいとる２";
        i2.startdate = new Date();
        i2.duedate = new Date();
        i2.url = "http://xxxxxx/";
        i2.progress = 30;
        i2.estimation = 50;

        let ia:Issue[] = [i1,i2];

        var e:Excel = new Excel();


        let r:ExportResult = await e.saveIssueList( ia , "issues.xlsx");
        expect( r.error ).toBeNull();


        fs.unlinkSync('issues.xlsx');


        done();

    }, 10000 );
});
