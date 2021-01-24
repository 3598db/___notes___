# :star:字符串的扩展
[[toc]]

## 字符的Unicode表示法
rugo
```js
"\u{20BB7}"
// "𠮷"

"\u{41}\u{42}\u{43}"
// "ABC"
```

## 字符串的遍历器接口
ES6为字符串添加了遍历器接口（详见《Iterator》一章），使得字符串可以被`for...of`循环遍历。

## 模板字符串

## 模板编译
```js
// 一段模板
let template = `
<ul>
  <% for(let i=0; i < data.supplies.length; i++) { %>
    <li><%= data.supplies[i] %></li>
  <% } %>
</ul>
`;

// 编译函数
function compile(template){
  const evalExpr = /<%=(.+?)%>/g;
  const expr = /<%([\s\S]+?)%>/g;

  template = template
    .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
    .replace(expr, '`); \n $1 \n  echo(`');
    
  template = 'echo(`' + template + '`);';

  // template
  // "echo(`
  // <ul>
  //   `); 
  //   for(let i=0; i < data.supplies.length; i++) {  
  //   echo(`
  //     <li>`); 
  //   echo(  data.supplies[i]  ); 
  //   echo(`</li>
  //   `); 
  //   }  
  //   echo(`
  // </ul>
  // `);"

  let script =
  `(function parse(data){
    let output = "";

    function echo(html){
      output += html;
    }

    ${ template }

    return output;
  })`;

  return script;
}

// 生成编译函数
let parse = eval(compile(template));
// 插入生成的html
document.body.innerHTML = parse({ supplies: [ "broom", "mop", "cleaner" ] });
```

## 标签模板
