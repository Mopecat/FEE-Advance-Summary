let ncp = require("ncp"); // 第三方模块 => 拷贝
let path = require("path");
let util = require("util");
// ncp 用法
// ncp(
//   path.resolve(__dirname, "README.md"), // 需要拷贝的文件
//   path.resolve(__dirname, "README1.md"), // 拷贝后的文件
//   err => {
//     // 回调函数
//     console.log(err);
//   }
// );

// 上面的ncp的用法不是很优雅 现在一般都用async await + promise 的方式写 这里就用会用到util的一个模块，promisify => 转换为promise 用法如下
ncp = util.promisify(ncp);
(async () => {
  await ncp(
    path.resolve(__dirname, "README.md"),
    path.resolve(__dirname, "README1.md")
  );
  console.log("拷贝成功");
})();

// promisify的原理非常简单 就是返回一个函数 函数再返回一个promise
const promisify = fn => (...args) => {
  return new Promise((resolve, reject) => {
    fn(...args, function(err) {
      if (err) reject();
      resolve();
    });
  });
};
// 验证一下 功能无误
ncp = promisify(ncp);
(async () => {
  await ncp(
    path.resolve(__dirname, "README.md"),
    path.resolve(__dirname, "README1.md")
  );
  console.log("拷贝成功");
})();
