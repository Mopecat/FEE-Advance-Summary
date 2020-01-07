# Node 相关笔记

## module

1. 每个文件都相当于一个模块，模块中的`this`指向 `module.exports` 核心原理文件读写 + 自执行函数
2. 如果别人想使用我 就需要 `require`
3. 我要想给别人用 就需要 `module.exports`
4. 模块的路径查找顺序是先找文件，找不到文件，再找文件夹(11 版本)
5. 第三方模块查找：默认会去`node_modules`文件夹下查找，找不到的话，会向上级目录的`node_modules`文件夹查找，直到根目录，还找不到会报错。找到`node_modules`中对应的文件夹后，会先以这个第三方模块的`package.json`里的`main`字段定义的入口文件为入口,如果没定义则找`index.js`

原理代码:

```js
const path = require("path");
const fs = require("fs");
const vm = require("vm");
// Module类
function Module(id) {
  this.id = id;
  this.exports = {};
}
// 处理文件的方法
Module.extensions = {
  ".js"(module) {
    let script = fs.readFileSync(module.id, "utf8");
    let fnStr = Module.wrapper[0] + script + Module.wrapper[1];
    let fn = vm.runInThisContext(fnStr); // 让字符串变成js代码
    fn.call(
      module.exports,
      module,
      module.exports,
      req,
      module.id,
      path.dirname(module.id)
    );
  },
  ".json"(module) {
    let script = fs.readFileSync(module.id, "utf8");
    module.exports = JSON.parse(script);
  }
};
Module.wrapper = [
  "(function(module,exports,require,__filename,__dirname){",
  "})"
];
// 加载模块方法
Module.prototype.load = function() {
  // 获取文件后缀名
  let ext = path.extname(this.id);
  Module.extensions[ext](this); // 根据不同的后缀 调用不同的处理方法
};
// 解析文件名 路径
Module.resolveFileName = function(filename) {
  // 把相对路径解析成绝对路径 默认会先判断一下是否是绝对路径
  let absPath = path.resolve(__dirname, filename);
  let flag = fs.existsSync(absPath); // 判断文件是否存在 异步方法被废弃
  let current = absPath; // 默认是当前路径
  if (!flag) {
    let keys = Object.keys(Module.extensions);
    for (let i = 0; i < keys.length; i++) {
      current = absPath + keys[i];
      let flag = fs.existsSync(current);
      if (flag) {
        break;
      } else {
        current = null;
      }
    }
  }
  if (!current) {
    // 如果没有 说明加了后缀文件还是不存在
    throw new Error("文件不存在");
  }
  return current;
};
Module.cache = {}; // 缓存
// req => 代表的require 方法
function req(filename) {
  let current = Module.resolveFileName(filename);
  // 判断是否有缓存
  if (Module.cache[current]) {
    return Module.cache[current].exports;
  }
  let module = new Module(current);
  Module.cache[current] = module;
  module.load();
  return module.exports;
}

let js = req("./a");
console.log(js);
let json = req("./b");
console.log(json);
```

## global

1. 全局对象中除了 global 所包括的 还有模块匿名函数的参数： `module.exports`,`module,require`,`_dirname`,`_filename`

2. `process` 进程 代表当前启用的应用

- `process.platform`: 判断当前平台 `window => win32` ， `Mac => darwin`
- `process.argv`: 代表用户传递的参数 默认前两个参数没什么意义

```js
// 在/Node/global目录下
console.log(process.argv.slice(2));
// 执行 node index.js --port 3000 --me forever18 => [ '--port', '3000', '--me', 'forever', '18' ]
```

- `process.chdir` => change dir `process.cwd()` => current working directory
- `process.env`: 环境变量
- `process.nextTick`: `node` 中的微任务

3. `Buffer` 缓存区(用来处理二进制数据的) `node`读取文件时存储的是二进制的 二进制比较长 所以缓存区存储的是十六进制的

4. `clearInterval` `setInterval`

5. `clearTimeout` `setTimeout`

6. `clearImmediate` `setImmediate`
