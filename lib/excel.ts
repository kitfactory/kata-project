import {Issue,Kata} from './kata';
import {Exporter,ExportResult} from './exporter';
import * as fs from 'fs';

var officegen = require('officegen');

const TITLES =[
    "タイトル",
    "担当",
    "開始日",
    "終了日",
    "工数",
    "進捗",
    "URL"
];

/**
 * Excelに保存する
 */
export class Excel extends Exporter{

    public saveIssueList( issues:Issue[] , file:string ):Promise<ExportResult>{
        console.log("excel write issues");

        let xlsx = officegen ('xlsx');
        let r:ExportResult = new ExportResult();
        let self = this;

        let p:Promise<ExportResult> = new Promise(function( resolve ){
            
            xlsx.on ('finalize', function(written) {
                console.log("Excel Done !!" + written );
                r.error = null;
                r.result = written;
                resolve( r );
            });

            xlsx.on('error', function(err) {
                console.log("Excel Error !!" + err);

                r.error = err;
                r.result = null;
                resolve( r );
            });


            var sheet = xlsx.makeNewSheet();
            sheet.name = 'kata-project-export';

            self.setTitle( sheet );
            self.setIssueContent( sheet , issues );

            var out:fs.WriteStream = fs.createWriteStream(file);
            out.on('error', function(err) {
                console.log("Excel Error !!" + err);
                r.error = err;
                r.result = null;
                resolve( r );
            });            
            xlsx.generate(out);
        });
        return p;
    }



    /**
     * 
     * @param sheet 
     */
    private setTitle( sheet:any ){
        let i = 0;
        sheet.data[0] = [];
        for( i = 0 ; i < TITLES.length ; i++ ){
            sheet.data[0][i]=TITLES[i];
        }
    }

    private toString( d:Date ):string{
        let s:string = d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate();
        return s;
    }

    /**
     * 
     * @param sheet 
     * @param issues 
     */
    private setIssueContent( sheet:any , issues:Issue[] ){
        let i = 0;
        for( i = 0 ; i < issues.length ; i++ ){
            sheet.data[i+1] = [];
            sheet.data[i+1][0] = issues[i].title;
            sheet.data[i+1][1] = issues[i].assignee;
            sheet.data[i+1][2] = this.toString( issues[i].startdate );
            sheet.data[i+1][3] = this.toString( issues[i].duedate );
            sheet.data[i+1][4] = issues[i].estimation;
            sheet.data[i+1][5] = issues[i].progress;
            sheet.data[i+1][6] = issues[i].url;
        }
    }
}