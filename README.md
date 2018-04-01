# simple-server

A simple Koa2 application implementation

## Usage

```
git clone repoUrl
cd repoUrl
npm install
npm run dev
```

## Structure

* router/root.js: 指定页面路由（具体页面放 /views 内）
* public/*: 放静态资源（若不需要编译，前端调用使用 /[type]/[name].[suffix]）
* webpack.config.js: devConfig 中 entry 指定需要编译的 js 资源（前端调用使用 /dist/[name].js）


```
├── [4.0K]  api
│   └── [4.0K]  v1
│       └── [ 731]  index.js
├── [4.0K]  conf
│   ├── [ 185]  db.js
│   └── [ 443]  sql.js
├── [ 684]  index.js
├── [ 11K]  LICENSE
├── [ 970]  package.json
├── [  67]  README.md
├── [4.0K]  router
│   ├── [ 180]  root.js
│   └── [ 244]  user.js
├── [4.0K]  util
│   ├── [2.2K]  agg-utils.js
│   └── [ 719]  base.js
└── [4.0K]  views
    └── [2.2K]  home.ejs
```
