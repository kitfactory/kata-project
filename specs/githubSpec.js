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
var token = process.env.GITHUB_TOKEN;
var base = "https://api.github.com/repos/";
var user = "kitfactory";
var project = "kata-test";
///issues?access_token=891986eaa2383498581f5056b182a1032170dec3&filter=all
describe("github", function () {
    it("github", function (done) {
        return __awaiter(this, void 0, void 0, function* () {
            var github = new index_1.GitHub();
            github.init(base, user, token);
            let p = yield github.getProjectIsssues(project);
            expect(p.issues.length).toBe(21);
            done();
        });
    }, 20000);
});
