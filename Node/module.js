// 模块 es模块 commonjs模块
// 每个文件都是一个模块
// AMD => require.js CMD => sea.js (都不维护了)

// commonjs 只是一个规范
// 每个文件都是一个模块
// 如果别人想使用我 就需要require
// 我要想给别人用 就需要module.exports

// 怎么实现模块化? 防止命名冲突
// 命名空间  无法彻底解决命名问题
// 自执行函数 node 让js 拥有了在服务端执行的能力，可以读写文件

// fs模块
const fs = require("fs");
const path = require("path");

// fs.access(".gitignore"); // 判断文件是否存在 如果不存在抛出异常
// fs.readFileSync(); // 同步读取文件
// __dirname => 当前目录
console.log(__dirname);
console.log(path.resolve(__dirname, "module.js")); // resolve出来的一定是绝对目录
console.log(path.join(__dirname, "a")); // 拼接出来的 有 '/'只能用join
console.log(path.extname("main.js")); // 获取后缀名
console.log(path.basename("main.js", ".js")); // 获取文件名 去掉后缀的
console.log(path.dirname(__dirname)); // 获取父路径

// commonjs
const vm = require("vm"); // 虚拟机模块
// vm提供了一个沙箱环境（安全且不影响其他）
let b = 1000;
vm.runInThisContext(`console.log(b)`); // 访问不到b
vm.runInThisContext(`console.log('vvv')`); // 可以打印vvv
