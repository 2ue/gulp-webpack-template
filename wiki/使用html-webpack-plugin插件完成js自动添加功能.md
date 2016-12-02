## 使用html-webpack-plugin插件完成JS文件自动添加功能

### example

假设`webpack.config.js`的`output.path`为`dist/`(后面会用到);

下面是一个完整的`html-webpack-plugin`配置

``` javascript
obj = {
    template: path.join(__dirname, 'default_index.ejs'),
    title: 'Gulp-Webpack',
    filename: 'index.html',
  	template: 'index.html',
    hash: false,
    inject: true,
    compile: true,
    favicon: false,
    minify: false,
    cache: true,
    showErrors: true,
    chunks: 'all',
    excludeChunks: [],
    xhtml: false
}
```

### 参数解释

#### title（string | 非必填 | 默认为空）

生成的HTML文件的titile

#### filename（string  | 必填 | 默认index.html）

生成的HTML文件名，生成文件路径默认为`output.path`，即`dist/index.html`

若要指定目录，则写成`views/index.html`，则会生成到`dist/views/index.html`

则写成`../views/index.html`，则会生成到`views/index.html`，`views`和`dist`目录同级

#### template （string | 必填 |  默认index.html）

生成HTML文件的模板，即原始的HTML文件，默认起始路径为`webpack.config.js`所在路径(一般根目录)，指定HTML文件模板时，需指定路径，如`views/index.html`

#### inject（string || bolen | 必填 |  默认true）
值：true | 'body' | 'head' | false

`true`与`'body'`等价，表示把js文件插入到HTML文件底部

`false`与`'head'`等价，表示把js文件插入到HTML文件头部

#### favicon（string  | 非必填 | 默认为空）

顾名思义，不多说

#### minify（bolen || obj  | 必填 | 默认false）

传递` html-minifier`选项给`minify`输出，false就是不压缩

#### chunks（arry | 非必填 | 默认为‘all'）

需要添加的JS模块需和入口文件配置的key保持一致

如：

``` javascript
enrty:{
  'js/page/app': 'src/js/page/app.js',
  'js/page/index':'src/js/page/index.js'
}
```

那么chunks则需要这么写：

``` javascript
chunks: ['js/page/app','js/page/index']
```

注意，如果对js提取了公共模块，那么上面的配置将不会添加公共模块到你的HTML文件，此时你需要额外的配置

``` javascript
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
new CommonsChunkPlugin('common/common.js');
```

``` javascript
chunks: ['common/common.js','js/page/app','js/page/index'] //common/common.js后缀不能省略
```



### 参考

- [html-webpack-plugin插件github](https://github.com/ampedandwired/html-webpack-plugin)