import {GanttProject,Issue,ExportResult} from '../index';


describe( "gantt" , function(){

    it( "gantt_project" , function(){
        let i1:Issue = new Issue();
        i1.assignee = "なまえ１";
        i1.title = "たいとる１";
        i1.startdate = new Date();
        i1.duedate = new Date("2017-04-09");
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

        let g:GanttProject = new GanttProject();
        g.saveIssueList( [i1,i2] , "hoge.csv" );

    });
});