"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const fs = require("fs");
describe("excel", function () {
    it("excel export", function (done) {
        return __awaiter(this, void 0, void 0, function* () {
            let i1 = new index_1.Issue();
            i1.assignee = "なまえ１";
            i1.title = "たいとる１";
            i1.startdate = new Date();
            i1.duedate = new Date();
            i1.url = "http://xxxxxx/";
            i1.progress = 50;
            i1.estimation = 20;
            let i2 = new index_1.Issue();
            i2.assignee = "なまえ２";
            i2.title = "たいとる２";
            i2.startdate = new Date();
            i2.duedate = new Date();
            i2.url = "http://xxxxxx/";
            i2.progress = 30;
            i2.estimation = 50;
            let ia = [i1, i2];
            var e = new index_1.Excel();
            let r = yield e.saveIssueList(ia, "issues.xlsx");
            expect(r.error).toBeNull();
            fs.unlinkSync('issues.xlsx');
            done();
        });
    }, 10000);
});
