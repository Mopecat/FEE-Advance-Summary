// 文件流 文件的读取和操作
const fs = require("fs");
const path = require("path");

let rs = fs.createReadStream(path.resolve(__dirname, "1.txt"), {
  flags: "r", //当前的操作是什么
  encoding: null, // 编码类型 默认是buffer
  highWaterMark: 64 * 1024, // 内部会创建64K大的buffer
  // 读取权限默认是4，写入默认是2，执行是1
  mode: 0o666, // 文件操作权限，（文件读取，文件写入，文件执行）8进制 0o666 = 438 第一位表示我自己，第二位表示我家里人，第三位表示别人 666就表示这三种人都可以度可以写不可以执行
  autoClose: true, // 是否自动关闭文件
  start: 0, // 开始读取的位置
  end: 10 // 读取结束的位置 这样写一共就是11个
});

// 文件打开触发
// rs.on("open", function() {
//   console.log("文件打开");
// });

// rs.on("data", function(data) {
//   console.log(data);
//   this.pause()
// });
// setInterval(() => {
//   rs.resume();
// },1000);
// // 文件读取完毕
// rs.on("end", function() {
//   console.log("文件读取完毕");
// });

// // 文件关闭触发
// rs.on("close", function() {
//   console.log("文件关闭");
// });

// rs.on("error", function() {
//   console.log("出错了");
// });

// 以上是正常用法
// 下面要用自己写的
const ReadStream = require("./ReadStream");
let myrs = new ReadStream(path.resolve(__dirname, "1.txt"), {
  flags: "r", //当前的操作是什么
  encoding: null, // 编码类型 默认是buffer
  highWaterMark: 2, // 内部会创建64K大的buffer
  // 读取权限默认是4，写入默认是2，执行是1
  mode: 0o666, // 文件操作权限，（文件读取，文件写入，文件执行）8进制 0o666 = 438 第一位表示我自己，第二位表示我家里人，第三位表示别人 666就表示这三种人都可以度可以写不可以执行
  autoClose: true, // 是否自动关闭文件
  start: 0, // 开始读取的位置
  end: 10 // 读取结束的位置 这样写一共就是11个
});

// 文件打开触发
myrs.on("open", function(fd) {
  console.log("文件打开", fd);
});

myrs.on("data", function(data) {
  console.log(data);
  this.pause(); // 暂停流
});
setInterval(() => {
  myrs.resume(); // 恢复读取
}, 1000);
// 文件读取完毕
myrs.on("end", function() {
  console.log("文件读取完毕");
});

// 文件关闭触发
myrs.on("close", function() {
  console.log("文件关闭");
});

myrs.on("error", function() {
  console.log("出错了");
});
