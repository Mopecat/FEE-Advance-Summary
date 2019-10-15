// es6 模块化
// 怎么使用es6模块
// 现在的模块主要 有三种 esModle(es6 import那个)  commonjs模块（require主要针对node）  umd(浏览器˜) 尽量不要混用
// esModule是静态导入 => 必须用在顶级作用域 比如 if(...){import ...} 这样是不行的 commonjs模块是动态的

setInterval(() => {
  console.log(c, b); //  每过一秒值都会变
}, 1000);
// import 会解析在页面最顶端 （类似于变量提升）
import defaultValue, { c, b } from "./a";
console.log(defaultValue); // 取出export default的值 不能放在{}内
// defaultValue = 1;
// c = 4 // 报错 导入的变量不能更改

import * as obj from "./a"; // 取出a模块中所有的变量和值放到一个对象 obj中
console.log(obj);
// obj.b = 5; // 仍然不可以更改
// ----------------------------------------------

// 文件合并导出
import * as obj1 from "./z"; // 用z.js整合x.js和 y.js中想要导出的变量 然后这里直接引入z即可
console.log(obj1);

import "./a"; // 有副作用的导入 可以让文件执行 但是并没有使用这个文件中的内容 比如a.js中的console执行了 这种用法一般可以引入css文件

// 动态导入
let btn = document.createElement("button");
btn.innerText = "点击导入x.js";
btn.addEventListener("click", () => {
  import("./x").then(data => {
    console.log(data);
    alert(`x.js中的变量,a:${data.a},b:${data.b}`);
  });
});
document.body.appendChild(btn);
