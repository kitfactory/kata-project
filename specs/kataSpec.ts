import {KataUtil} from "../index";
import {Issue} from "../index";
import {Progress} from "../index";

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



    it( "temporary" , function(){
        let m:moment.Moment= moment();
        

    });


});
