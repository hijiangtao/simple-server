# simple-server

A simple server implemented with Koa2, which you may not want to use it.

## Usage

```
# Clone the repository
git clone git@github.com:hijiangtao/simple-server.git

# Enter into the folder
cd repoUrl

# Install and test the application
npm install
npm run dev
```

## Structure

* Routes: all routes rule should be put in `router` folder, there are seperated with `root.js` and `user.js`;
* Views: all view templates should be put in `views` folder, you need to code with routes when you want to add a new page into current application.
* Static Assets: all the files in `public` folder are static assets, which includes `css`, `js` and `img` three types sub-folders inside. You can include it in your view templates directly with rule like `/[type]/[name].[suffix]`.
* webpack.config.js: the webapack configuration for this application, you need to specify the JavaScript files that you want to compile in the `entry` of `devConfig`, you can include them in your view templates with rule like `/dist/[name].js`.

The structure of this application shows below:

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

## VAST18

The specific wiki for VAST18 shows [here](https://github.com/hijiangtao/simple-server/tree/VAST18) (in `VAST18` branch).

## Contact

Github [@hijiangtao](https://github.com/hijiangtao)

## LICENSE

Apache License V2.0
