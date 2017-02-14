## gulp-webpack-template
> 学习`gulp + webpack`打包，用`webpack`处理`javascript`文件打包问题，其余问题交由`gulp`处理。目前功能较少需要不断改进和完善。


#### 预想完成功能：

- 资源打包任务
  - images：雪碧图，拷贝，生成dataurl等  ----  (待实现)
  - css(less/sass/stylus/css .etc)：编译预处理器，压缩，自动前缀，雪碧图，MD5等 
  - javascript：打包，压缩，MD5 
  - html：主要是include方法，使用gulp-file-include---  (待实现，[参考](https://github.com/fwon/gulp-webpack-demo/blob/master/gulpfile.js))
  - 自动添加`javascript`文件到`HTML`文件 (2016年12月1日16:05:40) 
- 监听变化，自动编译 
- 热刷新 ---- (待实现)
- server：暂不确定用`gulp`还是`webpack`实现 ---- (待实现)

#### 更新记录

- 2016年12月1日16:05:51
  - 修改入口文件遍历方式：由`HTML`文件来遍历对应的同名JS文件（以前是遍历所有的js文件）
  - 自动添加`javascript`文件到同名HTML文件


- 2016年12月1日10:11:02
  - `less`编译任务 -- `gulp`
  - `javascript`编译任务 -- `webpack` --> `gulp`
  - 监听任务，自动编译  -- `gulp`
  - 支持多文件打包

#### 目录结构

``` she
├── ./dist
│   ├── ./dist
│   ├── ./dist/css
│   ├── ./dist/images
│   └── ./dist/js
├── ./src
│   ├── ./src/css
│   │   └── ./src/css/public.css
│   ├── ./src/images
│   │   └── ....
│   ├── ./src/less
│   │   └── ./src/less/app.less  //less文件编译入口
│   │   └── ./src/less/page.less
│   └── ./src/js
│       ├── ./src/js/common //一些不支持require方式的类库
│       │   ├── ./src/js/common/...js
│       ├── .......
│       │   .......
│       └── ./src/js/page //和views中的同名HTML文件一一对应
│           └── ./src/js/page/app.js
│           └── ./src/js/page/aboutUs.js
├── ./views
│   └── ./views/app.html
│   └── ./views/aboutUs.html
├── ./webpack.config.js
├── ./gulpfile.js
└── ./package.json
```

#### 编译后生成dist目录

``` shell
├── ./dist
│   ├── ./src/css
│   │   └── ./src/css/page.css
│   ├── ./src/images
│   │   └── ....
│   └── ./src/js
│       ├── ./src/js/common //打包的公共模块
│       │   ├── ./src/js/common/common.js
│       ├── .......
│       │   .......
│       └── ./src/js/page //和views中的同名HTML文件一一对应
│           └── ./src/js/page/app.js
│           └── ./src/js/page/aboutUs.js
├── ./views
│   └── ./views/app.html
│   └── ./views/aboutUs.html
├──
```

#### 安装依赖：

``` shell
//gulp webpack任务依赖
npm isntall --save-dev gulp gulp-less gulp-notify gulp-plumber gulp-watch gulp-util webpack
//或者执行npm install，依赖于package.json文件
npm install
```

#### 编译：

``` shell
//执行
gulp
//或者
npm run dev
```