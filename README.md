# Kata-project

![kata.png](./kata.png)

プロジェクトをもっと簡単に計測しよう！

# インストール

```
> npm install kitfactory/kata-project

```

# 利用方法:

## 事前準備



## 計測コード

わずか数行でプロジェクトが計測できます。

```
var kata = require('kata-project');

kata.initGitLab("http://..../api/v3", key  );
kata.initElastic("host",port);
kata.issue.GitLab2Elastic( projectid , "index" );

kata.calc.EvmProject("index",["filter_label"] "dest_index");


```



# 説明

kata-projectはプロジェクト計測を簡単にするツールです。プロジェクト計測用のデータ型を定義し、各ツールの入力をデータ型に変換することで様々なツールを横断して、自然とプロジェクトが計測できるようになります。


# Kata-Issue-Type

|項目|内容|
|:--|:--|
|ID|ID|
|title|タイトル|
|description|記載|
|label|ラベル(配列)|
|startdate|開始日|
|duedate|締切日|
|progress|進捗(%)|
|status|open/close|
|assignee|担当者|
|estimation|見積工数|
|json|オリジナルのJSONデータ|

# Kata-Item-Type

|項目|内容|
|:--|:--|
|timestamp|時間|
|total|項目数|
|ok|合格項目数|
|ng|NG項目数|
|json|オリジナルJSONのデータ|


# Kata-Snapshot-Type

|項目|内容|
|:--|:--|
|timestamp|時間|
|A|Aの数|
|B|Bの数|
|C|Cの数|
...

# Kata-Evm-Type

|項目|内容|
|:--|:--|
|timestamp|時間|
|total|合計見積|
|planned|計画値|
|progress|実績値|



If you would liket to use cli, use the bellow commands.

```
> kata-github-issues labels=[foo,bar] 
> kata-gitlab-issues labels=[foo,bar]
kata-gitlab-issue
kata-github-issue
kata-aggregate-evm
kata-aggregate-ranking

kata-redmine-issue
kata-excel-issue

kata-junit-test
kata-junit-test
kata-excel-test


kata-encrypt-setting
kata-decrypt-setting
```


