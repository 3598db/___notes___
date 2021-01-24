# Git标准化实践

## Commit message 格式

```
<type>(<scope>): <subject>
// 注意冒号 : 后有空格
// 如 feat(miniprogram): 增加了小程序模板消息相关功能
```
cope选填表示commit的作用范围，如数据层、视图层，也可以是目录名称
subject必填用于对commit进行简短的描述
type必填表示提交类型，值有以下几种：

* feat - 新功能 feature
* fix - 修复 bug
* docs - 文档注释
* style - 代码格式(不影响代码运行的变动)
* refactor - 重构、优化(既不增加新功能，也不是修复bug)
* perf - 性能优化
* test - 增加测试
* chore - 构建过程或辅助工具的变动
* revert - 回退
* build - 打包

```
// commitlint
// 项目目录下安装
npm i commitlint --save-dev
npm i @commitlint/config-conventional --save-dev

touch commitlint.config.js

// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // type 类型定义
    'type-enum': [2, 'always', [
      "feat", // 新功能 feature
      "fix", // 修复 bug
      "docs", // 文档注释
      "style", // 代码格式(不影响代码运行的变动)
      "refactor", // 重构(既不增加新功能，也不是修复bug)
      "perf", // 性能优化
      "test", // 增加测试
      "chore", // 构建过程或辅助工具的变动
      "revert", // 回退
      "build" // 打包
    ]],
    // subject 大小写不做校验
    // 自动部署的BUILD ROBOT的commit信息大写，以作区别
    'subject-case': [0]
  }
};


// husky
// 项目目录下安装
npm i husky --save-dev
// 在package.json文件中增加相关配置
"husky": {
  "hooks": {
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
  }
}

// commitizen
// 全局安装
npm i commitizen -g
// 项目目录下安装
npm i commitizen --save-dev
commitizen init cz-customizable --save-dev --save-exact

// 此时package.json文件中会自动增加以下配置
// 但注意这里的path可能要根据实际情况进行修改，如nAdmin项目
"config": {
  "commitizen": {
    "path": "./node_modules/cz-customizable"
  }
}

touch .cz-config.js

// .cz-config.js
'use strict';

module.exports = {
  types: [
    {value: 'feat',     name: 'feat:     新功能'},
    {value: 'fix',      name: 'fix:      修复'},
    {value: 'docs',     name: 'docs:     文档变更'},
    {value: 'style',    name: 'style:    代码格式(不影响代码运行的变动)'},
    {value: 'refactor', name: 'refactor: 重构(既不是增加feature，也不是修复bug)'},
    {value: 'perf',     name: 'perf:     性能优化'},
    {value: 'test',     name: 'test:     增加测试'},
    {value: 'chore',    name: 'chore:    构建过程或辅助工具的变动'},
    {value: 'revert',   name: 'revert:   回退'},
    {value: 'build',    name: 'build:    打包'}
  ],
  // override the messages, defaults are as follows
  messages: {
    type: '请选择提交类型:',
    // scope: '请输入文件修改范围(可选):',
    // used if allowCustomScopes is true
    customScope: '请输入修改范围(可选):',
    subject: '请简要描述提交(必填):',
    body: '请输入详细描述(可选，待优化去除，跳过即可):',
    // breaking: 'List any BREAKING CHANGES (optional):\n',
    footer: '请输入要关闭的issue(待优化去除，跳过即可):',
    confirmCommit: '确认使用以上信息提交？(y/n/e/h)'
  },
  allowCustomScopes: true,
  // allowBreakingChanges: ['feat', 'fix'],
  skipQuestions: ['body', 'footer'],
  // limit subject length, commitlint默认是72
  subjectLimit: 72
};


```

## 自动生成Change log

```
// 安装
npm i conventional-changelog-cli --save-dev
npm i conventional-changelog-config --save-dev

touch changelog.config.js

// changelog.config.js
'use strict';

module.exports = {
  link: {
    host: 'http://gitlab.dealmoon.net',
    owner: 'frontend',
    repository: 'web_us_nAdmin' // 对应的仓库
  },
  typeTitle: {
    feat: 'Features',
    fix: 'Bug Fixes',
    perf: 'Performance Improvements',
    revert: 'Reverts',
    docs: 'Documentation',
    style: 'Styles',
    refactor: 'Code Refactoring',
    test: 'Tests',
    chore: 'Chores'
  },
  commitHashLength: 7
};


// 在package.json中加入配置方便使用
"scripts": {
  // 让changelog使用我们自己的config库
  "changelog": "conventional-changelog -p config -i CHANGELOG.md -s"
  // "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s"
}
// 项目目录下生成 CHANGELOG.md 文件
npm run changelog
```


