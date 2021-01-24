# webpack 知识点


* 前端资源模块化管理和打包工具
* 按照依赖和规则递归构建依赖关系图，生成前端资源


一. 常规loader
* 编译相关：babel-loader、ts-loader
* 样式相关：style-loader、css-loader、less-loader、postcss-loader
* 文件相关：file-loader、url-loader
webpack把每个文件（.css .html .less .jpg etc.）都作为模块处理，而webpack只能理解JavaScript，loader则会将这些文件转换为模块，添加到依赖图表中。主要预处理通过require()/import语句引入的文件。

二. 常规plugin
* 优化相关：CommonsChunkPlugin、UglifyjsWebpackPlugin
* 功能相关：ExtractTextWebpackPlugin、HtmlWebpackPlugin、HotModuleRepacementPlugin、CopyWebpackPlugin

三. 概念

1. module chunk bundle
* module：开发阶段概念，未经处理的一个个文件
* chunk：打包阶段观念，根据入口模块生成的中间产物
* bundle：构建完成概念，和chunk一一对应，除非提取出第三方包或者css
2. filename chunkFilename
* filename：入口文件对应的输出文件
* chunkFilename：懒加载文件
3. webpackPrefetch webpackPreload webpackChunkName
* webpackChunkName：预加载的文件取别名
* webpackPrefetch：浏览器空闲下载文件
* weebpackPreload：父chunk加载并行下载
4. hash chunkhash contenthash
* hash：整个项目构建
* chunkhash：同一个chunk内容相关
* contenthash：文件内容相关
5. eval cheap inline module
* eval：打包后的模块都是eval
* cheap： map映射只显示行不显示列，忽略源自loader的source map
* inline：映射文件以base64格式编码，加在bundle文件最后，不产生独立的map文件
* module：增加对loader source map和第三方模块的映射


