// fs 操作文件 的一些方法
const fs = require("fs");
const path = require("path");
// 重命名
// fs.rename(
//   path.resolve(__dirname, "小宇1.txt"),
//   path.resolve(__dirname, "rename小宇1.txt"),
//   function(err) {}
// );

// 删除文件
// fs.unlink(path.resolve(__dirname, "rename小宇1.txt"), function(err) {});

// 文件读写
// fs.readFile() 异步的
// fs.readFileSync() 同步的
// fs.writeFile() 异步的
// fs.writeFileSync() 同步的

// 判断文件是否存在
// fs.existsSync() 同步的
// fs.access() 异步的

// 复制文件
// fs.copyFile() 先读完再写 会淹没内存

// 文件夹的操作
// 创建目录
// fs.mkdirSync(); // 创建目录，创建子目录时要保证父目录存在 不然会报错
// 写一个嵌套类型的创建文件夹的方法 用异步的
// function mkdir(paths, callback) {
//   paths = paths.split("/");
//   let index = 1;
//   function next() {
//     // 说明已经都创建完了 就可以执行回调函数了
//     if (index === paths.length + 1) return callback();
//     // 拿到当前要创建目录地址
//     let dirPath = paths.slice(0, index++).join("/");
//     // 判断一下是否存在，不存在就创建一个 然后继续next
//     fs.access(dirPath, function(err) {
//       if (err) {
//         fs.mkdir(path.resolve(__dirname, dirPath), next);
//       } else {
//         next();
//       }
//     });
//   }
//   next();
// }

// mkdir("a/b/c/d/e/f", () => {
//   console.log("创建完成");
// });

// 读取目录
// fs.readdir() 读取文件

// 删除目录
// fs.rmdir() 如果目录下有东西就不能删除
