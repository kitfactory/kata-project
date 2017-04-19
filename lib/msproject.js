"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exporter_1 = require("./exporter");
var jsonxml = require('jsontoxml');
class MSProject extends exporter_1.Exporter {
    saveIssueList(issues, file) {
        let ret = new Promise(function (resolve) {
            let r = new exporter_1.ExportResult();
            let json = [{
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
                        { Calendars: [
                                { Calendar: [
                                        { UID: 1 },
                                        { Name: "Standard" },
                                        { IsBaseCalendar: 1 },
                                        { WeekDays: [
                                                { WeekDay: [
                                                        { DayType: 1 },
                                                        { DayWorking: 0 }
                                                    ] },
                                                { WeekDay: [
                                                        { DayType: 2 },
                                                        { DayWorking: 1 },
                                                        { WorkingTimes: [
                                                                { WorkingTime: [
                                                                        { FromTime: "08:00:00" },
                                                                        { ToTime: "12:00:00" }
                                                                    ] },
                                                                { WorkingTime: [
                                                                        { FromTime: "13:00:00" },
                                                                        { ToTime: "17:00:00" }
                                                                    ] }
                                                            ] }
                                                    ] },
                                                { WeekDay: [
                                                        { DayType: 3 },
                                                        { DayWorking: 1 },
                                                        { WorkingTimes: [
                                                                { WorkingTime: [
                                                                        { FromTime: "08:00:00" },
                                                                        { ToTime: "12:00:00" }
                                                                    ] },
                                                                { WorkingTime: [
                                                                        { FromTime: "13:00:00" },
                                                                        { ToTime: "17:00:00" }
                                                                    ] }
                                                            ] }
                                                    ] },
                                                { WeekDay: [
                                                        { DayType: 4 },
                                                        { DayWorking: 1 },
                                                        { WorkingTimes: [
                                                                { WorkingTime: [
                                                                        { FromTime: "08:00:00" },
                                                                        { ToTime: "12:00:00" }
                                                                    ] },
                                                                { WorkingTime: [
                                                                        { FromTime: "13:00:00" },
                                                                        { ToTime: "17:00:00" }
                                                                    ] }
                                                            ] }
                                                    ] },
                                                { WeekDay: [
                                                        { DayType: 5 },
                                                        { DayWorking: 1 },
                                                        { WorkingTimes: [
                                                                { WorkingTime: [
                                                                        { FromTime: "08:00:00" },
                                                                        { ToTime: "12:00:00" }
                                                                    ] },
                                                                { WorkingTime: [
                                                                        { FromTime: "13:00:00" },
                                                                        { ToTime: "17:00:00" }
                                                                    ] }
                                                            ] }
                                                    ] },
                                                { WeekDay: [
                                                        { DayType: 6 },
                                                        { DayWorking: 1 },
                                                        { WorkingTimes: [
                                                                { WorkingTime: [
                                                                        { FromTime: "08:00:00" },
                                                                        { ToTime: "12:00:00" }
                                                                    ] },
                                                                { WorkingTime: [
                                                                        { FromTime: "13:00:00" },
                                                                        { ToTime: "17:00:00" }
                                                                    ] }
                                                            ] }
                                                    ] },
                                                { WeekDay: [
                                                        { DayType: 7 },
                                                        { DayWorking: 0 }
                                                    ] }
                                            ] }
                                    ] }
                            ] },
                        { Tasks: [
                                { Task: [
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
                                    ] }
                            ] }
                    ]
                }];
            var xml = jsonxml(json);
            console.log(xml);
            resolve(r);
        });
        return ret;
    }
}
exports.MSProject = MSProject;
