# kata-project

![kata.png](./kata.png)

プロジェクトをもっと簡単に計測しよう！

# kata-projectは何をしてくれるのか？

kata-projectはわずか数行でプロジェクトが計測できるようにするスクリプト集です。プロジェクトを型にはめることがある意味の目標です。kata-projectでElasticsearchに集計したデータをKibanaでビジュアライズすることで、簡単にプロジェクトの状況を把握することができるようになるでしょう。

** プロジェクト全体の進捗 **


** 個人ごとの状況 **




# 1.インストール

```
> npm install kitfactory/kata-project --save

```

# 2.利用方法:

## 2.1.事前準備

本ツールはTypeScript、Node.js、Elasticserach、Kibanaが必要です。それぞれをインストールします。

なお、TypeScriptではPromiseを使用するのでtsconfig.jsonのtarget項目をes6に設定してください。

```tsconfig.json
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "es6",
        "noImplicitAny": false,
        "sourceMap": false
    }
}
```

## 2.2.イシューを使ったプロジェクト情報の取得

GitLabやGitHubからプロジェクトの関する情報を取得することができます。わずか3行でプロジェクトのイシューの情報が取得できます。

```
import {GitLab} from 'kata-project';
import {Issue} from 'kata-project';

var g:GitLab = new GitLab();
g.init( "https://gitlab.com/ api/v3", key , null );
var i:Issue[] = g.getProjectIssues();

```

sampleディレクトリを覗いて見てください。


## 2.3.イシューの情報をテンプレートで補う

イシューの情報はテンプレートに記録しましょう。kata-projectではイシューの記述部分に「--キーワード(任意の文字列)--」と記載されている場合に、その次の行をそのプロパティの値として認識します。

以下のようにイシューに記載すると見積を10Hとして記載することが出来ます。

```
## --見積(単位H 記入例:10)--
10

```

## 2.4.イシューを分析する。

KataUtilクラスにはイシューを分析するためのメソッドが幾つか用意されています。プロジェクトの全体の工数や進捗を計算することが可能です。


## 2.5. Elasticsearchに保存する。

分析の結果をProgressやSanpshotとしてElasticsearchに保存をします。

```

let kata:KataUtil 


```



## 2.6. 定期的に実行する。

JenkinsなどのCIツールでスクリプトを実行し、定期スナップを取得するのがおすすめです。

## 2.7. Kibanaで確認する。

最後にElasticsearchで保存したデータをKibanaでビジュアライズしましょう。これで



```


var kata = require('kata-project');


kata.initGitLab("http://..../api/v3", key  );
kata.initElastic("localhost",port);
kata.issue.GitLab2Elastic( projectid , "index" );
kata.calc.EvmProject("index",["filter_label"] "dest_index");

```

# 3.

kata-projectはプロジェクト計測を簡単にするツールです。kata-projectではプロジェクト計測用に各ツールの共通「データ型」を定義します。そして、各ツールの入力を共通の「データ型」に変換することで様々なツールを横断して、自然とプロジェクトが計測できるようになります。

## 3.1. 例：プロジェクトの進捗の計測

![kata-tool](./kata-tool.001.png)

## 3.2. 例：プロジェクトのテストの状況

![kata-tool](./kata-tool.002.png)

# 4.共通データ型


## 4.1.Kata-Issue-Type

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

## 4.2.Kata-Item-Type

|項目|内容|
|:--|:--|
|timestamp|時間|
|total|項目数|
|ok|合格項目数|
|ng|NG項目数|
|json|オリジナルJSONのデータ|


## 4.3.Kata-Snapshot-Type

kata.calc.Rankで作成されます。

|項目|内容|
|:--|:--|
|timestamp|時間|
|A|項目A|
|B|項目B|
|json|オリジナルデータ|
...

## 4.4.Kata-Progress-Type

kata.calc.Progressで作成されます。

|項目|内容|
|:--|:--|
|timestamp|時間|
|total|合計見積|
|planned|timestamp時点計画値|
|progress|timestamp時点実績値|



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

