"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gitlab_1 = require("../lib/gitlab");
// var gitlab = require("../lib/gitlab");
var gitlab = new gitlab_1.GitLab();
gitlab.init("https://gitlab.com/api/v3", process.env.GITLAB_TOKEN);
const project_id = "458780";
describe("gitlab", function () {
    it("getIssues", function (done) {
        console.log("issues");
        gitlab.getProjectIssuesAsync(project_id, function (error, result) {
            if (error) {
                console.log("error" + error);
            }
            console.log("total result " + result.length);
            expect(true).toBe(result.length == 2);
            done();
        });
    }, 200000);
    it("getIssues2", function (done) {
        console.log("issues2");
        var promise = gitlab.getProjectIssue(project_id);
        promise.then((value) => {
            var x = value.item;
            console.log("end promise -> " + x.length);
            done();
        });
    }, 200000);
});
