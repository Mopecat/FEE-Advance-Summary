const fs = require("fs");
const path = require("path");

let rs = fs.createReadStream(path.resolve(__dirname, "1.txt"), {
  highWaterMark: 1 // 每次读取几个， 读取默认大小是64k
});
const ws = fs.createWriteStream(path.resolve(__dirname, "write.txt"), {
  highWaterMark: 3 // 预计占用多少内存， 默认是16K
});

let arr = [];
rs.on("data", function(data) {
  arr.push(data);
  // 做写的操作
  let flag = ws.write(data); // 这个flag 代表的是当前预计的内存大小，是否被撑满
  // console.log(flag);
});

rs.on("end", function() {
  // console.log(Buffer.concat(arr).toString());
  ws.end();
});

// 可读流 中有 data 和 end 事件
// 可写流 中有 write 和 end 方法

// 下面也用来试验自己写的writeStream
// 只看写的方法
const WriteStream = require("./WriteStream");
const ws1 = new WriteStream(path.resolve(__dirname, "write2.md"), {
  highWaterMark: 3, // 预计占用的内存空间
  encoding: "utf8", // 默认utf8
  start: 0, // 从文件的第0个位置开始写入
  mode: 438, // 权限
  flags: "w" // 默认操作是w
});
let index = 0;
function write() {
  let flag = true;
  while (index < 10 && flag) {
    // 可写流写入的数据只能是字符串或者buffer
    flag = ws1.write(index + "");
    index++;
    // console.log(flag);
    if (index > 9) {
      ws1.end();
    }
  }
}
write();
// 只有当我们写入的个数达到了预计的大小（highWaterMark）并且被写入到文件后清空了才会触发 drain 事件
ws1.on("drain", function() {
  // console.log("写满了3个");
  write();
});

ws1.on("close", function() {
  // console.log("close");
});
