import {KataUtil} from "../index";
import {Issue} from "../index";
import {Progress} from "../index";
import {Snapshot} from "../index";
import {MemberIssue} from "../index";
import {GitLab} from "../index";
import {GitLabResult} from "../index";
import {ElasticSearch} from "../index";
import {ElasticResult} from "../index";
/*
import {ElasticsearchMapper} from "../index";
*/
import * as moment from "moment";


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

    it( "caluculate_progress" , function(){
        let util:KataUtil = new KataUtil();
        util.testTime = new Date(2017,3,1);
        console.log( "util testtime : " + util.getCurrentTime() );

        /**
         * progress = 9 / planned = 10 / total = 10
         * 完了分(9時間分)が進捗に
         * 全てが計画値にカウントされる
         * 見積合計値に10時間がカウントされる。
         */
        let expired:Issue = new Issue();
        expired.estimation = 10;
        expired.startdate = new Date("2017/1/1");
        expired.duedate = new Date("2017-02-27");
        expired.progress = 90;

        /**
         * progress = 9 + 9 / planned = 10 + 5 / total = 10 + 10 
         * 完了分(9時間分)が進捗にカウントされ、日付の均等割りが計画値にカウントされる。
         * 見積合計値に10時間がカウントされる。
         */
        let undone:Issue = new Issue();
        undone.estimation = 10;
        undone.startdate = new Date("2017/2/1");
        undone.duedate = new Date("2017-04-30");
        undone.progress = 90;
        

        /**
         * progress = 9 + 9 + 10  / planned = 10 + 5 + 10 / total = 10 + 10 + 10
         * 完了分(10時間分)が進捗にカウントされ、日付の均等割りが計画値にカウントされる。
         * 見積合計値に10時間がカウントされる。
         */
        let past_done:Issue = new Issue();
        past_done.estimation = 10;
        past_done.startdate = new Date("2017-02-01");
        past_done.duedate = new Date("2017-02-28");
        past_done.progress = 100;

        /**
         * progress = 9 + 9 + 10 +10  / planned = 10 + 5 + 10 + 0 / total = 10 + 10 + 10 + 10
         * 完了分(10時間分)が進捗にカウントされ、日付の均等割りが計画値にカウントされる。
         * 見積合計値に10時間がカウントされる。
         */
        let future_done:Issue = new Issue();
        future_done.estimation = 10;
        future_done.startdate = new Date("2017-04-01");
        future_done.duedate = new Date("2017-04-28");
        future_done.progress = 100;

        /**
         * progress = 9 + 9 + 10 +10 + 0  / planned = 10 + 5 + 10 + 0 + 0 / total = 10 + 10 + 10 + 10 + 10
         * 完了分(10時間分)が進捗にカウントされ、日付の均等割りが計画値にカウントされる。
         * 見積合計値に10時間がカウントされる。
         */
         let not_start:Issue = new Issue();
         not_start.estimation = 10;
         not_start.startdate = new Date("2017-10-01");
         not_start.duedate = new Date( "2017-10-10" );
         not_start.progress = 0;

         /**
          * 合計 progress 38 / @lanned 25 くらい / total 50
          */

        var issues:Issue[] = [expired,undone,past_done,future_done,not_start];
        var progress:Progress = util.calculateProgress( issues );
        console.log( "progress %j " , progress );

    });

    it( "member_issue" , function(){
        let i1 = new Issue();
        i1.assignee = "foo";
        let i2 = new Issue();
        i2.assignee = "foo";
        let i3 = new Issue();
        i3.assignee = "bar";
        let i4 = new Issue();
        i4.assignee = "baz";

        let is = [i1,i2,i3,i4];

        let util = new KataUtil();
        let mi:MemberIssue[] = util.getMemberIssue( is );
        expect( mi.length ).toBe( 3 );
        mi.forEach( function(m ){
            if( m.name == "foo"){
                expect(m.issues.length ).toBe(2);
            }else if( m.name === "bar" ){
                expect(m.issues.length ).toBe(1);
            }else if( m.name === "baz" ){
                expect(m.issues.length ).toBe(1);
            }
        });
    });

    const project_id = "458780";

    it( "gitlab" , async function( done ){
        var gitlab:GitLab = new GitLab();
        let url = "";
        let key = "";
        gitlab.init( "https://gitlab.com/api/v3" , process.env.GITLAB_TOKEN );
        let result:GitLabResult = await gitlab.getProjectIssue(project_id);
        expect( result.issues.length ).toBe( 4 );

        let util = new KataUtil();
        util.testTime = new Date("2017-03-20");

        let filtered:Issue[] = util.filterIssues( "filter1" , result.issues );
        expect( filtered.length ).toBe( 3 );
        
        // 現在値 3/20
        // issue1 -> スルー
        // issue2 -> 見積 20 / 計画 20 / 進捗 20 / 進捗 100% 
        // issue3-> 見積 20 / 計画 20 / 進捗 18 / 進捗 90%
        // issue4 見積 10　/ 計画 7くらい / 実施 5 / 進捗 50% 開始 3/1 締切 3/31 
        /*
        filtered.forEach( function(i){
            console.log( "title " + i.title );
            console.log( "issue 見積" + i.estimation );
            console.log( "issue 進捗" + i.progress );
            console.log( "issue 開始日" + i.startdate );                        
            console.log( "issue 締切" + i.duedate );

            let totalProgress:Progress = util.calculateProgress( [i] );
            console.log( "total progress %j" , totalProgress );

        });
        */

        let totalProgress:Progress = util.calculateProgress( filtered );
        expect( totalProgress.total ).toBe( 50 );
        expect( totalProgress.progress ).toBe(43 );
        expect( totalProgress.planned ).toBe( 46.204083977356 );
        
        /*
        console.log( "total progress %j" , totalProgress );
        */

        let mi:MemberIssue[] = util.getMemberIssue( filtered );
        expect( mi.length ).toBe( 2 );
        
        mi.forEach( function( m:MemberIssue ){
            console.log("caluculate member progress " + m.name );           
            let p:Progress = util.calculateProgress( m.issues );
            console.log( "mi " + m.name + " %j" , p );
        });


        let s:Snapshot = util.getMemberProgress( filtered );
        console.log("snapshot %j"  ,  s );

        util.initElasticSearch( "localhost" , 9200 );
        let re:ElasticResult = await util.saveSnapshot( "member" , s );
        console.log( "snapshot %j" , re );
        expect( re.error ).toBeNull();
        done();
    }, 10000 );


});
