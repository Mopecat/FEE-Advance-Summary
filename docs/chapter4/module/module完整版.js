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
