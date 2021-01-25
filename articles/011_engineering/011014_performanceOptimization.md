# webpack性能优化

1.  升级webpack大版本
2. 耗时最多的是babel-loader和uglify插件
针对babel-loader和uglify需要针对性单独处理。

babel-loader：
* 需要缩小解析范围
* 使用cache缓存
* HappyPack开启并行打包
uglify：
* 开启并行压缩ParallelUglifyPlugin

3. 构建体积优化
* 使用CommonChunkPlugin,MiniCssExectPlugin
* DLL：通过webpack.DllPlugin构建dll库并通过webpack.DllReferencePlugin引入。（webpack5中替换为HardSourceWebpackPlugin）
* gzip
* tree-shaking
* uglify
* 按需加载

4. 开发环境优化watchOptions 

5. cnd

总之，构建需要实现以下几点:
* 静态资源的导入  URL 需要变成指向 DNS 服务的绝对路径的 URL，而不是相对 HTML 文件的
* 静态资源的文件名需要带上由文件内容算出来的 Hash 值，以防止被缓存
* 将不同类型的资源放到不同域名的 DNS 服务上，以防止资源的并行加载被阻塞

6. 提取公共代码
splitChunk
