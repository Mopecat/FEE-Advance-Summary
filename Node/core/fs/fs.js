// file system 可以在服务器端读取文件和数据 方法是同步和异步共存
// 同步方法容易使用，（刚开始运行时用）
// 异步方法不会阻塞主线程（运行起来后用异步）
const fs = require("fs");
const path = require("path");
// let result = fs.readFileSync(path.resolve(__dirname, "小宇.txt"), "utf8");
// console.log(result);

// 读取的文件不存在会报错，写入的文件不存在会创建文件
// fs.readFile(path.resolve(__dirname, "小宇.txt"), (err, data) => {
//   if (err) {
//     console.log(err);
//   }
//   fs.writeFile(
//     path.resolve(__dirname, "小宇.txt"),
//     data + "\r\n比方说当我遇见你",
//     (err, data) => {
//       if (err) {
//         console.log(err);
//       }
//     }
//   );
// });
// 把文件中的内容全部读取到内存中，然后再把内存中所有的内容写入到文件中，如果文件很大，会造成内存的浪费。性能很不好，解决方式是读一点写一点
// 标准是 64K以下的文件用上述的方式
// 64K以上的用读一点写一点，手动按照字节来读取 fs.open fs.read fs.write fs.close
// flag: r 读取/ w 写入/ r+ 在读的基础上可以写（文件不存在会报错）/ w+ 在写的基础上读取 （如果文件不存在 会创建）
let buffer = Buffer.alloc(3);
fs.open(path.resolve(__dirname, "./小宇.txt"), "r", (err, fd) => {
  if (err) {
    console.log(err);
  }
  console.log(fd);
  // fd是文件描述器
  // buffer 是我要把文件写到哪个buffer中
  // 0,3 是从buffer的第0个位置写入，写入三个
  // 0是从文件哪个位置开始读取
  fs.read(fd, buffer, 0, 3, 0, (err, bytesRead) => {
    // bytesRead真正读取到的个数，因为有可能我要10个 但是内容只有5个
    console.log(bytesRead); // 3 证明读到了3个
    // 关闭文件
    fs.close(fd, () => {
      console.log("close");
    });
  });
});
// 以上是一个读文件的全过程
// 一边读一边写就可以写成下面的样子（看这个回调脑瓜子疼）
const SIZE = 6;
let buffer1 = Buffer.alloc(SIZE);
fs.open(path.resolve(__dirname, "小宇.txt"), "r", (err, rfd) => {
  if (err) console.log(err);
  fs.open(path.resolve(__dirname, "小宇1.txt"), "w", (err, wfd) => {
    let readOffset = 0;
    let writeOffset = 0;
    function next() {
      fs.read(rfd, buffer1, 0, SIZE, readOffset, function(err, bytesRead) {
        // 没读到
        if (bytesRead === 0) {
          fs.close(rfd, () => {
            console.log("close rfd");
          });
          fs.close(wfd, () => {
            console.log("close wfd");
          });
          return;
        }
        fs.write(wfd, buffer1, 0, bytesRead, writeOffset, function() {
          readOffset += bytesRead;
          writeOffset += bytesRead;
          next();
        });
      });
    }
    next();
  });
});
