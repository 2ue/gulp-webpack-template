## gulp-webpack-template
> 学习gulp + webpack打包项目，用webpack处理javascript文件打包问题，其余问题交由gulp处理。目前功能较少需要不断改进和完善。


#### 预想完成功能：

- 资源打包任务
  - images：雪碧图，拷贝，生成dataurl等
  - css(less/sass/stylus/css .etc)：编译预处理器，压缩，自动前缀，雪碧图，MD5等
  - javascript：打包，压缩，MD5
  - html：主要是include方法
- 监听变化，自动编译
- 热刷新
- server：暂不确定用gulp还是webpack实现

#### 更新记录

- 2016年12月1日10:11:02
  - less编译任务 -- gulp
  - javascript编译任务 -- webpack -->gulp
  - 监听任务，自动编译  -- gulp

#### 安装依赖：

``` shell
//gulp webpack任务依赖
npm isntall --save-dev gulp gulp-less gulp-notify gulp-plumber gulp-watch gulp-util webpack
//其他依赖，用于数据生成
npm install --save-dev mockjs
//或者执行npm install
npm install
```