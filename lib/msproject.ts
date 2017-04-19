import { Exporter, ExportResult } from './exporter';
import { Issue } from './kata';


var jsonxml = require('jsontoxml');


class Resources{
    public id:Map<string,number>;
    public memberStart:Map<string,Date>;
    public memberFinish:Map<string,Date>;
    public totalStart:Date;
    public totalFinish:Date;
}

class Assignments{
    ;
}

class Tasks{
    ;
}

export class MSProject extends Exporter {


    private getDateString( date:Date ):string{
        let s:string = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDay();
        return s;
    }
    /**
     * StartDate,EndDate,CurrentDateを算出し、ヘッダー部分を作成する。
     * @param issues 
     */
    private getHeaderNodes(issues: Issue[]): any[] {

        let finish = null;
        let start = null;
        let current = new Date();

        issues.forEach(function (issue) {
            if (finish == null) {
                if (issue.duedate != null) {
                    finish = issue.duedate;
                }
            } else {
                if (issue.duedate.getTime() >= finish.getTime()) {
                    finish = issue.duedate;
                }
            }
            if (start == null) {
                if (issue.duedate != null) {
                    finish = issue.duedate;
                }
            } else {
                if (issue.startdate.getTime() <= start.getTime()) {
                    start = issue.startdate;
                }
            }
        });

        let ret = [
            { SaveVersion: 9 },
            { Title: "Project1" },
            { ScheduleFromStart: 1 },
            { StartDate: start },
            { FinishDate: finish },
            { FYStartDate: 1 },
            { CriticalSlackLimit: 0 },
            { CurrencyDigits: 2 },
            { CurrencySymbol: "$" },
            { CurrencySymbolPosition: 0 },
            { CalendarUID: 1 },
            { DefaultStartTime: "08:00:00" },
            { MinutesPerDay: 480 },
            { MinutesPerWeek: 2400 },
            { DaysPerMonth: 20 },
            { DefaultTaskType: 0 },
            { DefaultFixedCostAccrual: 2 },
            { DefaultStandardRate: 10 },
            { DefaultOvertimeRate: 15 },
            { DurationFormat: 7 },
            { WorkFormat: 2 },
            { EditableActualCosts: 0 },
            { HonorConstraints: 0 },
            { EarnedValueMethod: 0 },
            { InsertedProjectsLikeSummary: 0 },
            { MultipleCriticalPaths: 0 },
            { NewTasksEffortDriven: 0 },
            { NewTasksEstimated: 1 },
            { SplitsInProgressTasks: 0 },
            { SpreadActualCost: 0 },
            { SpreadPercentComplete: 0 },
            { TaskUpdatesResource: 1 },
            { FiscalYearStart: 0 },
            { WeekStartDay: 1 },
            { MoveCompletedEndsBack: 0 },
            { MoveRemainingStartsBack: 0 },
            { MoveRemainingStartsForward: 0 },
            { MoveCompletedEndsForward: 0 },
            { BaselineForEarnedValue: 0 },
            { AutoAddNewResourcesAndTasks: 1 },
            { CurrentDate: current },
            { MicrosoftProjectServerURL: 1 },
            { Autolink: 1 },
            { NewTaskStartDate: 0 },
            { DefaultTaskEVMethod: 0 },
            { ProjectExternallyEdited: 0 },
            { ActualsInSync: 0 },
            { RemoveFileProperties: 0 },
            { AdminProject: 0 },
            {
                Calendars: [
                    {
                        Calendar: [
                            { UID: 1 },
                            { Name: "Standard" },
                            { IsBaseCalendar: 1 },
                            {
                                WeekDays: [
                                    {
                                        WeekDay: [
                                            { DayType: 1 },
                                            { DayWorking: 0 }
                                        ]
                                    },
                                    {
                                        WeekDay: [
                                            { DayType: 2 },
                                            { DayWorking: 1 },
                                            {
                                                WorkingTimes: [
                                                    {
                                                        WorkingTime: [
                                                            { FromTime: "08:00:00" },
                                                            { ToTime: "12:00:00" }
                                                        ]
                                                    },
                                                    {
                                                        WorkingTime: [
                                                            { FromTime: "13:00:00" },
                                                            { ToTime: "17:00:00" }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        WeekDay: [
                                            { DayType: 3 },
                                            { DayWorking: 1 },
                                            {
                                                WorkingTimes: [
                                                    {
                                                        WorkingTime: [
                                                            { FromTime: "08:00:00" },
                                                            { ToTime: "12:00:00" }
                                                        ]
                                                    },
                                                    {
                                                        WorkingTime: [
                                                            { FromTime: "13:00:00" },
                                                            { ToTime: "17:00:00" }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        WeekDay: [
                                            { DayType: 4 },
                                            { DayWorking: 1 },
                                            {
                                                WorkingTimes: [
                                                    {
                                                        WorkingTime: [
                                                            { FromTime: "08:00:00" },
                                                            { ToTime: "12:00:00" }
                                                        ]
                                                    },
                                                    {
                                                        WorkingTime: [
                                                            { FromTime: "13:00:00" },
                                                            { ToTime: "17:00:00" }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        WeekDay: [
                                            { DayType: 5 },
                                            { DayWorking: 1 },
                                            {
                                                WorkingTimes: [
                                                    {
                                                        WorkingTime: [
                                                            { FromTime: "08:00:00" },
                                                            { ToTime: "12:00:00" }
                                                        ]
                                                    },
                                                    {
                                                        WorkingTime: [
                                                            { FromTime: "13:00:00" },
                                                            { ToTime: "17:00:00" }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        WeekDay: [
                                            { DayType: 6 },
                                            { DayWorking: 1 },
                                            {
                                                WorkingTimes: [
                                                    {
                                                        WorkingTime: [
                                                            { FromTime: "08:00:00" },
                                                            { ToTime: "12:00:00" }
                                                        ]
                                                    },
                                                    {
                                                        WorkingTime: [
                                                            { FromTime: "13:00:00" },
                                                            { ToTime: "17:00:00" }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        WeekDay: [
                                            { DayType: 7 },
                                            { DayWorking: 0 }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ];

        return ret;
    }

    /**
     * 
     * @param issues 
     * @param file 
     */
    public buildTasksNode(issues: Issue[]) :any{
        let taskArray = [];
        issues.forEach( function( issue ){
            taskArray.push();
        });

        let ret = {Tasks:taskArray};
        return ret;
    }

    


    /**
     * 
     * @param issues
     **/
    public buildResourcesNode( issues:Issue[] ): any {
        let s:Set<string> = new Set();
        let start:Map<string,Date> = new Map();
        let finish:Map<string,Date> = new Map();
        issues.forEach( function( issue ){
            if( issue.assignee != null ){
                let name:string = issue.assignee;
                s.add( name );
                if( start.has( name )){
                    let t:Date = start.get( name );
                    if( t.getTime() >= issue.startdate.getTime() ){
                        start.set( name , issue.startdate );
                    }
                }else{
                    start.set( name , issue.startdate );
                }
                if( finish.has( name )){
                    let t:Date = finish.get( name );
                    if( t.getTime() <= issue.duedate.getTime() ){
                        finish.set( name , issue.startdate );
                    }
                }else{
                    finish.set( name , issue.startdate );
                }
            }
        });

        let array:string[] = Array.from( s );
        let resources = [];
        for( let i = 1 ; i <= array.length ; i++ ){
            let r = {
                Resource:[
                    {UID: i },
                    {ID: i },
                    {Name: array[i-1]},
                    {Type: 1},
                    {IsNull: 0},
                    {EmailAddress:""},
                    {MaxUnits:1},
                    {PeakUnits:1},
                    {OverAllocated:0},
                    {Start:this.getDateString(start.get(array[i-1]))+"T08:00:00"},
                    {Finish:this.getDateString(finish.get(array[i-1]))+"T17:00:00"},
                    {CanLevel:0},
                    {StandardRateFormat:3},
                    {OvertimeRateFormat:3},
                    {IsGeneric:0},
                    {IsInactive:0},
                    {IsEnterprise:0},
                    {IsBudget:0},
                    {AvailabilityPeriods:""}
                ]
            };
            resources.push( r );
        }
        let ret = { Resources:resources};
        console.log("resource %j", ret );
        return ret;
    }

    public buildAssignementsNode( issues:Issue[] ):any{





    }

    /**
     * 担当者にIDを割り振るテーブルを作成する。
     * @param issues 
     * @return 担当者とIDのMap
     */
    private createResourceIDTable( issues:Issue[] ):Map<string,number>{
        let assignees:Set<string> = new Set();
        issues.forEach( (issue)=>{
            if( issue.assignee != null ){
                assignees.add( issue.assignee );
            }
        });
        let array:string[] = Array.from( assignees );
        let ret:Map<string,number> = new Map();
        for( let i = 0 ; i < array.length ; i++ ){
            ret.set( array[i] , i+1 );
        }
        return ret;
    }

    /**
     * 
     * @param issues 
     */
    public buildNodes( issues:Issue[] ){
        let resourceID:Map<string,number> = this.createResourceIDTable(issues);


        let tasks = [];
        let resources = [];
        let assignments = [];
        let memberStart:Map<string,Date> = new Map();
        let memberFinish:Map<string,Date> = new Map();
        let start:Date = null;
        let finish:Date = null;

    }

    public saveIssueList(issues: Issue[], file: string): Promise<ExportResult> {
        let ret: Promise<ExportResult> = new Promise(function (resolve) {
            let r: ExportResult = new ExportResult();

            let json: any = [{
                name: "Project",
                attrs: { "xmlns": "http://schemas.microsoft.com/project" },
                children: [
                    { SaveVersion: 9 },
                    { Title: "Project1" },
                    { ScheduleFromStart: 1 },
                    { StartDate: "2017-04-06T08:00:00" },
                    { FinishDate: "2017-04-07T17:00:00" },
                    { FYStartDate: 1 },
                    { CriticalSlackLimit: 0 },
                    { CurrencyDigits: 2 },
                    { CurrencySymbol: "$" },
                    { CurrencySymbolPosition: 0 },
                    { CalendarUID: 1 },
                    { DefaultStartTime: "08:00:00" },
                    { MinutesPerDay: 480 },
                    { MinutesPerWeek: 2400 },
                    { DaysPerMonth: 20 },
                    { DefaultTaskType: 0 },
                    { DefaultFixedCostAccrual: 2 },
                    { DefaultStandardRate: 10 },
                    { DefaultOvertimeRate: 15 },
                    { DurationFormat: 7 },
                    { WorkFormat: 2 },
                    { EditableActualCosts: 0 },
                    { HonorConstraints: 0 },
                    { EarnedValueMethod: 0 },
                    { InsertedProjectsLikeSummary: 0 },
                    { MultipleCriticalPaths: 0 },
                    { NewTasksEffortDriven: 0 },
                    { NewTasksEstimated: 1 },
                    { SplitsInProgressTasks: 0 },
                    { SpreadActualCost: 0 },
                    { SpreadPercentComplete: 0 },
                    { TaskUpdatesResource: 1 },
                    { FiscalYearStart: 0 },
                    { WeekStartDay: 1 },
                    { MoveCompletedEndsBack: 0 },
                    { MoveRemainingStartsBack: 0 },
                    { MoveRemainingStartsForward: 0 },
                    { MoveCompletedEndsForward: 0 },
                    { BaselineForEarnedValue: 0 },
                    { AutoAddNewResourcesAndTasks: 1 },
                    { CurrentDate: "2017-04-08T09:09:00" },
                    { MicrosoftProjectServerURL: 1 },
                    { Autolink: 1 },
                    { NewTaskStartDate: 0 },
                    { DefaultTaskEVMethod: 0 },
                    { ProjectExternallyEdited: 0 },
                    { ActualsInSync: 0 },
                    { RemoveFileProperties: 0 },
                    { AdminProject: 0 },
                    {
                        Calendars: [
                            {
                                Calendar: [
                                    { UID: 1 },
                                    { Name: "Standard" },
                                    { IsBaseCalendar: 1 },
                                    {
                                        WeekDays: [
                                            {
                                                WeekDay: [
                                                    { DayType: 1 },
                                                    { DayWorking: 0 }
                                                ]
                                            },
                                            {
                                                WeekDay: [
                                                    { DayType: 2 },
                                                    { DayWorking: 1 },
                                                    {
                                                        WorkingTimes: [
                                                            {
                                                                WorkingTime: [
                                                                    { FromTime: "08:00:00" },
                                                                    { ToTime: "12:00:00" }
                                                                ]
                                                            },
                                                            {
                                                                WorkingTime: [
                                                                    { FromTime: "13:00:00" },
                                                                    { ToTime: "17:00:00" }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                WeekDay: [
                                                    { DayType: 3 },
                                                    { DayWorking: 1 },
                                                    {
                                                        WorkingTimes: [
                                                            {
                                                                WorkingTime: [
                                                                    { FromTime: "08:00:00" },
                                                                    { ToTime: "12:00:00" }
                                                                ]
                                                            },
                                                            {
                                                                WorkingTime: [
                                                                    { FromTime: "13:00:00" },
                                                                    { ToTime: "17:00:00" }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                WeekDay: [
                                                    { DayType: 4 },
                                                    { DayWorking: 1 },
                                                    {
                                                        WorkingTimes: [
                                                            {
                                                                WorkingTime: [
                                                                    { FromTime: "08:00:00" },
                                                                    { ToTime: "12:00:00" }
                                                                ]
                                                            },
                                                            {
                                                                WorkingTime: [
                                                                    { FromTime: "13:00:00" },
                                                                    { ToTime: "17:00:00" }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                WeekDay: [
                                                    { DayType: 5 },
                                                    { DayWorking: 1 },
                                                    {
                                                        WorkingTimes: [
                                                            {
                                                                WorkingTime: [
                                                                    { FromTime: "08:00:00" },
                                                                    { ToTime: "12:00:00" }
                                                                ]
                                                            },
                                                            {
                                                                WorkingTime: [
                                                                    { FromTime: "13:00:00" },
                                                                    { ToTime: "17:00:00" }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                WeekDay: [
                                                    { DayType: 6 },
                                                    { DayWorking: 1 },
                                                    {
                                                        WorkingTimes: [
                                                            {
                                                                WorkingTime: [
                                                                    { FromTime: "08:00:00" },
                                                                    { ToTime: "12:00:00" }
                                                                ]
                                                            },
                                                            {
                                                                WorkingTime: [
                                                                    { FromTime: "13:00:00" },
                                                                    { ToTime: "17:00:00" }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                WeekDay: [
                                                    { DayType: 7 },
                                                    { DayWorking: 0 }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        Tasks: [
                            {
                                Task: [
                                    { UID: 0 },
                                    { ID: 0 },
                                    { Type: 0 },
                                    { IsNull: 0 },
                                    { WBS: 0 },
                                    { OutlineNumber: 0 },
                                    { OutlineLevel: 0 },
                                    { Priority: 500 },
                                    { Start: "2017-04-06T08:00:00" },
                                    { Finish: "2017-04-07T17:00:00" },
                                    { Duration: "PT16H0M0S" },
                                    { DurationFormat: 7 },
                                    { ResumeValid: 0 },
                                    { EffortDriven: 0 },
                                    { Recurring: 0 },
                                    { OverAllocated: 0 },
                                    { Estimated: 0 },
                                    { Milestone: 0 },
                                    { Summary: 0 },
                                    { Critical: 1 },
                                    { IsSubproject: 0 },
                                    { IsSubprojectReadOnly: 0 },
                                    { ExternalTask: 0 },
                                    { FixedCostAccrual: 3 },
                                    { RemainingDuration: "PT16H0M0S" },
                                    { ConstraintType: 0 },
                                    { CalendarUID: -1 },
                                    { LevelAssignments: 0 },
                                    { LevelingCanSplit: 0 },
                                    { IgnoreResourceCalendar: 0 },
                                    { HideBar: 0 },
                                    { Rollup: 0 },
                                    { EarnedValueMethod: 0 },
                                    { Active: 1 },
                                    { Manual: 0 }
                                ]
                            }
                        ]
                    }
                ]
            }];
            var xml = jsonxml(json);
            console.log(xml);
            resolve(r);
        });
        return ret;
    }
}

