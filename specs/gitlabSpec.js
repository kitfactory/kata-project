var gitlab = require("../lib/gitlab");

gitlab.init("https://gitlab.com/api/v3", process.env.GITLAB_TOKEN);

var project_id = "458780";

gitlab.getProjectIssues( project_id , function(error, result){
    console.log( result );
});

