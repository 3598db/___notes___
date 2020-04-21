# :star:koa-compose浅析
说到koa，最有名的估计就是它的中间件模型了，以其优雅简洁的设计，既可以通过中间件处理业务直之外或边界情况又不会过度入侵业务。

下面我们看一个例子：
```javascript
// app.js
const Koa = require('koa');
const app = new Koa();

app.use((ctx, next) => {
  console.log('1 - before');
  next();
  console.log('1 - after');
});

app.use((ctx, next) => {
  console.log('2 - before');
  next();
  console.log('2 - after');
});

app.use((ctx, next) => {
  console.log('3 - before');
  next();
  console.log('4 - after');
});

app.listen(3000);
```
```bash
// >terminal
node app.js
curl 127.0.0.1:3000

// output
1 - before
2 - before
3 - before
3 - after
2 - after
1 - after
```

之前很好奇为什么koa能保证中间件中`next()`之前的业务会顺序执行，`next()`之后的业务会倒序执行。   
也就是之前很多人文章里面说到的**洋葱圈**模型。   
于是自己着手尝试了各种方案，看能不能实现koa这样的效果。   
```javascript

class Koa {
  constructor() {
    this.middlewares = [];
  }
  init() {
    this._composeV3()
  }
  use(middleware) {
    this.middlewares.push(middleware);
  }

  // 模型一
  // 通用的then链模型
  // Promise.resolve().then(() => {
  //   ...
  // }).then(() => {
  //   ...
  // }).then(() => {
  //   ...
  // });
  // 特点：1）支持代码的顺序执行
  // 2）支持异步
  // 3）因为没有then函数，所以不支持倒序执行
  // 如果有需要业务模块需要强制按照顺序执行，可以使用这个模型
  // 而且可以使用上一个模块的执行结果
  _composeV1() {
    let promise;
    while(this.middleware.length){
      let middleware = this.middlewares.shift();
      if (promise) {
        promise.then(()=> {
          return middleware(ctx)
        })
      } else {
        promise = Promise.resolve(middleware(ctx));
      }
    }
    
    return promise;
  }

  // 模型二
  // 中间件嵌套执行模型
  // return middleware(ctx,functin next() {
  //   return middleware(ctx,functin next() {
  //     return middleware(ctx,functin next() {})
  //   })
  // })
  // 可以初步实现洋葱圈模型
  // 但是对异步任务的支持还有待考察
  // 兼容性较差 输出结果不支持then链调用
  // 
  _composeV2() {
    const middleware = this.middlewares;
    const ctx = this;
    return middlewareHandler();
    
    function middlewareHandler() {
      const middleware = middlewares.shift();
      if (middleware) {
        return middleware(ctx,functin next() {
          middlewareHandler();
        })
      }
    }
  }

  // 模型三
  // Promise中间件嵌套执行
  // return Promise.resolve(middleware(ctx,functin next() {
  //   return Promise.resolve(middleware(ctx,functin next() {
  //     return Promise.resolve(middleware(ctx,functin next() {}));
  //   }));
  // }));
  //
  // 即为koa-compose v4.0使用的模型
  // 可以实现洋葱圈模型效果
  // 支持中间件异步
  // 兼容性良好
  _composeV3() {
    const middleware = this.middlewares;
    const ctx = this;
    return middlewareHandler();
    
    function middlewareHandler() {
      const middleware = middlewares.shift();
      if (middleware) {
        return Promise.resolve(middleware(ctx,functin next() {
          middlewareHandler();
        }));
      }
    }
  }
}

app = new Koa();
app.use((ctx, next) => {
   next();
});
app.use((ctx, next) => {
   next();
});
app.use((ctx, next) => {
   next();
});
app.use((ctx, next) => {
   next();
});
app.init();
```

其中共尝试了三种方案，因为koa中间件模型可能还有一些未知的功能我还没有挖掘出来，所以具体实现都只是依据洋葱圈模型的效果实现，后面会继续深入koa的其他内容，再完善这部分内容。

其实koa-compose在v2.0版本使用了co模块与Generate实现的洋葱圈模型，这也是后来异步函数(Async/Await)的雏形的灵感吧，哈哈，只是猜测，因为目前Async函数也是Generate与Promise的语法糖。但是对tj大神的co模块不太了解，后面也同样会对这个主题进行深入学习。再补上v2.0的co模块与Generate模型。
